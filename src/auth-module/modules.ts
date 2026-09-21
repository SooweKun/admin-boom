import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { TOKEN_TTL, requireEnv } from './config.js';
import { AuthController } from './controllers/controllers.js';
import { JwtGuard } from './guards/jwt.guard.js';
import { AuthService } from './services/services.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: requireEnv(config, 'JWT_SECRET'),
        signOptions: { expiresIn: TOKEN_TTL },
      }),
    }),
    // Лимит только для /auth/login (ThrottlerGuard висит лишь на нём):
    // 5 попыток за 5 минут с одного IP.
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 5 * 60_000, limit: 5 }],
      errorMessage: 'Слишком много попыток входа, попробуйте через 5 минут',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: JwtGuard }],
})
export class AuthModule {}

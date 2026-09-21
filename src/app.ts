import { Module } from '@nestjs/common';
import { AuthModule } from './auth-module/modules.js';
import { CardModule } from './card-module/modules.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    CardModule,
  ],
})
export class AppModule {}

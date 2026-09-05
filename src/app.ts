import { Module } from '@nestjs/common';
import { CardModule } from './card-module/modules.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CardModule,
  ],
})
export class AppModule {}

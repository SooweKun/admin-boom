import { Module } from '@nestjs/common';
import { CardController } from './controllers/controllers.js';
import { CardService } from './services/services.js';

@Module({
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}

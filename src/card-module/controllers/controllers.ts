import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCardDto, UpdateCardDto } from '../dto.js';
import { CardService } from '../services/services.js';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('test')
  test() {
    return { status: 'ok' };
  }

  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}

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
import { Public } from '../../auth-module/public.js';
import { CreateCardDto, UpdateCardDto } from '../dto.js';
import { CardService } from '../services/services.js';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Public()
  @Get('test')
  test() {
    return { status: 'ok' };
  }

  /** Только видимые карточки. На этом роуте живёт мобильное приложение — не закрывать. */
  @Public()
  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  /** Все карточки, включая скрытые, — для админки. Объявлен выше `:id`, иначе тот его перехватит. */
  @Get('all')
  async findAllWithHidden() {
    return this.cardService.findAll(true);
  }

  @Public()
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

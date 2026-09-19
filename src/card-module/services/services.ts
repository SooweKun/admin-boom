import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service.js';
import { CreateCardDto, UpdateCardDto } from '../dto.js';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  /**
   * По умолчанию отдаёт только видимые карточки — это то, что показывает приложение.
   * Админка запрашивает `includeHidden`, чтобы видеть и скрытые.
   */
  async findAll(includeHidden = false) {
    try {
      return await this.prisma.card.findMany({
        where: includeHidden ? undefined : { isVisible: true },
        include: {
          advantages: true,
        },
      });
    } catch (error) {
      console.error('❌ Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
      include: { advantages: true },
    });

    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }

  async create(createCardDto: CreateCardDto) {
    const { advantages, ...cardData } = createCardDto;

    return this.prisma.card.create({
      data: {
        ...cardData,
        advantages: {
          create: advantages.map((stat) => ({ stat })),
        },
      },
      include: { advantages: true },
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const { advantages, ...cardData } = updateCardDto;

    const existing = await this.prisma.card.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.card.update({
        where: { id },
        data: cardData,
      });

      if (advantages !== undefined) {
        await tx.advantage.deleteMany({
          where: { cardId: id },
        });

        if (advantages.length > 0) {
          await tx.advantage.createMany({
            data: advantages.map((stat) => ({
              stat,
              cardId: id,
            })),
          });
        }
      }

      return tx.card.findUnique({
        where: { id },
        include: { advantages: true },
      });
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.card.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    return this.prisma.$transaction([
      this.prisma.advantage.deleteMany({ where: { cardId: id } }),
      this.prisma.card.delete({ where: { id } }),
    ]);
  }
}

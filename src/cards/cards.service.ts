import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private readonly cardsRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const new_card = this.cardsRepository.create(createCardDto);
    await this.cardsRepository.save(new_card);
    return new_card;
  }

  findAll() {
    return this.cardsRepository.find();
  }

  findOne(id: string) {
    return this.cardsRepository.findOneBy({ id });
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    await this.cardsRepository.update(id, updateCardDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }
    await this.cardsRepository.delete(id);
    return card;
  }
}

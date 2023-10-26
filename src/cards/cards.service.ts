import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelsService } from '../levels/levels.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private readonly cardsRepository: Repository<Card>,
        private readonly levelsService: LevelsService,
    ) {}

    async create(createCardDto: CreateCardDto) {
        const level = await this.levelsService.findOne(createCardDto.level_id);
        if (!level) {
            throw new NotFoundException('Уровень не найден');
        }
        delete createCardDto.level_id;
        const new_card = this.cardsRepository.create({
            ...createCardDto,
            level,
        });
        await this.cardsRepository.save(new_card);
        return new_card;
    }

    findAll() {
        return this.cardsRepository.find({
            relations: {
                level: true,
            },
        });
    }

    findOne(id: string) {
        return this.cardsRepository.findOne({
            where: { id },
            relations: {
                level: true,
            },
        });
    }

    async update(id: string, updateCardDto: UpdateCardDto) {
        const card = await this.findOne(id);
        if (!card) {
            throw new NotFoundException('Карточка не найдена');
        }
        const level = updateCardDto.level_id
            ? await this.levelsService.findOne(updateCardDto.level_id)
            : card.level;
        if (!level) {
            throw new NotFoundException('Уровень не найден');
        }
        delete updateCardDto.level_id;
        await this.cardsRepository.update(id, { ...updateCardDto, level });
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

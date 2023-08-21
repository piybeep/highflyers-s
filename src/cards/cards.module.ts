import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { LevelsModule } from '../levels/levels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), LevelsModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

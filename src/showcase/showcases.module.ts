import { Module } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { ShowcasesController } from './showcases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showcase } from './entities/showcase.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Showcase]), CategoriesModule],
  controllers: [ShowcasesController],
  providers: [ShowcasesService],
})
export class ShowcasesModule {}

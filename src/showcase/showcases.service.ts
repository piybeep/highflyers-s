import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { Showcase } from './entities/showcase.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ShowcasesService {
    constructor(
        @InjectRepository(Showcase)
        private readonly showcaseRepository: Repository<Showcase>,
        private readonly categoriesService: CategoriesService,
    ) {}

    async create(createShowcaseDto: CreateShowcaseDto) {
        const category = await this.categoriesService.findOne(
            createShowcaseDto.category_id,
        );
        if (!category) {
            throw new NotFoundException();
        }
        const new_showcase = this.showcaseRepository.create({
            points: createShowcaseDto.points,
            price: createShowcaseDto.price,
            fullPrice: createShowcaseDto.fullPrice,
            category,
        });
        await this.showcaseRepository.save(new_showcase);
        return new_showcase;
    }

    findAll() {
        return this.showcaseRepository.find();
    }

    findOne(id: string) {
        return this.showcaseRepository.findOne({ where: { id } });
    }

    async update(id: string, updateShowcaseDto: UpdateShowcaseDto) {
        const showcase = await this.findOne(id);
        if (!showcase) {
            throw new NotFoundException();
        }
        let category: undefined | Category = undefined;
        if (updateShowcaseDto.category_id) {
            category = await this.categoriesService.findOne(
                updateShowcaseDto.category_id,
            );
            if (!category) {
                throw new NotFoundException();
            }
        }
        delete updateShowcaseDto.category_id;
        await this.showcaseRepository.update(id, {
            ...updateShowcaseDto,
            category,
        });
        return this.findOne(id);
    }

    async remove(id: string) {
        const showcase = await this.findOne(id);
        if (!showcase) {
            throw new NotFoundException();
        }
        await this.showcaseRepository.delete(id);
        return showcase;
    }
}

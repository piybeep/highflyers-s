import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '@src/tags/entities/tag.entity';
import { SlugService } from 'nestjs-slug';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
        private readonly slugService: SlugService,
    ) {}

    async create(createTagDto: CreateTagDto) {
        const new_tag = this.tagsRepository.create({
            ...createTagDto,
            value: this.slugService.generateSlug(createTagDto.name, {
                trim: true,
                lowerCase: true,
            }),
        });
        await this.tagsRepository.save(new_tag);
        return new_tag;
    }

    findAll() {
        return this.tagsRepository.find();
    }

    findManyByIds(ids: string[]) {
        return this.tagsRepository.find({ where: { id: In(ids) } });
    }

    findOne(id: string) {
        return this.tagsRepository.findOne({ where: { id } });
    }

    async update(id: string, updateTagDto: UpdateTagDto) {
        const existing_tag = await this.findOne(id);
        if (!existing_tag) {
            throw new NotFoundException('Тег не найден');
        }
        await this.tagsRepository.update(id, {
            ...updateTagDto,
            value: this.slugService.generateSlug(updateTagDto.name, {
                trim: true,
                lowerCase: true,
            }),
        });
        return this.findOne(id);
    }

    async remove(id: string) {
        const existing_tag = await this.findOne(id);
        if (!existing_tag) {
            throw new NotFoundException('Тег не найден');
        }
        return this.tagsRepository.delete(id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from '@src/tags/tags.service';
import { TedTalk } from '@src/ted-talks/entities/ted-talk.entity';
import { Repository } from 'typeorm';
import { CreateTedTalkDto } from './dto/create-ted-talk.dto';
import { UpdateTedTalkDto } from './dto/update-ted-talk.dto';

@Injectable()
export class TedTalksService {
    constructor(
        @InjectRepository(TedTalk)
        private readonly tedTalkRepository: Repository<TedTalk>,
        private readonly tagsService: TagsService,
    ) {}

    async create(createTedTalkDto: CreateTedTalkDto) {
        const new_ted_talks = this.tedTalkRepository.create({
            ...createTedTalkDto,
            tags: await this.tagsService.findManyByIds(createTedTalkDto.tags),
        });
        await this.tedTalkRepository.save(new_ted_talks);
        return new_ted_talks;
    }

    findAll() {
        return this.tedTalkRepository.findAndCount();
    }

    findOne(id: string) {
        return this.tedTalkRepository.findOne({ where: { id } });
    }

    async update(id: string, updateTedTalkDto: UpdateTedTalkDto) {
        const existing_ted_talks = await this.findOne(id);
        if (!existing_ted_talks) {
            throw new NotFoundException('TedTalks не найден');
        }
        await this.tedTalkRepository.update(
            id,
            Object.assign(
                {},
                updateTedTalkDto,
                updateTedTalkDto.tags && {
                    tags: await this.tagsService.findManyByIds(
                        updateTedTalkDto.tags,
                    ),
                },
            ),
        );
        return this.findOne(id);
    }

    async remove(id: string) {
        const existing_ted_talks = await this.findOne(id);
        if (!existing_ted_talks) {
            throw new NotFoundException('TedTalks не найден');
        }
        return this.tedTalkRepository.delete(id);
    }
}

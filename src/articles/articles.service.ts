import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@src/articles/entities/article.entity';
import { TagsService } from '@src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articlesRepository: Repository<Article>,
        private readonly tagsService: TagsService,
    ) {}

    async create(createArticleDto: CreateArticleDto) {
        const tags = await this.tagsService.findManyByIds(
            createArticleDto.tags,
        );
        const new_article = this.articlesRepository.create({
            ...createArticleDto,
            tags,
        });
        return this.articlesRepository.save(new_article);
    }

    findAll() {
        return this.articlesRepository.find();
    }

    findOne(id: string) {
        return this.articlesRepository.findOneBy({ id });
    }

    async update(id: string, updateArticleDto: UpdateArticleDto) {
        const article = await this.findOne(id);
        if (!article) {
            throw new NotFoundException();
        }
        const tags =
            'tags' in updateArticleDto
                ? await this.tagsService.findManyByIds(updateArticleDto.tags)
                : article.tags;
        await this.articlesRepository.update(id, { ...updateArticleDto, tags });
        return this.findOne(id);
    }

    async remove(id: string) {
        const article = await this.findOne(id);
        if (!article) {
            throw new NotFoundException();
        }
        await this.articlesRepository.delete(id);
        return article;
    }
}

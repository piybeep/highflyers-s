import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@src/articles/entities/article.entity';
import { TagsModule } from '@src/tags/tags.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
    imports: [TypeOrmModule.forFeature([Article]), TagsModule],
    controllers: [ArticlesController],
    providers: [ArticlesService],
})
export class ArticlesModule {}

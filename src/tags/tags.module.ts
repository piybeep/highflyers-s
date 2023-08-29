import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '@src/tags/entities/tag.entity';
import { SlugModule } from 'nestjs-slug';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tag]), SlugModule],
    controllers: [TagsController],
    providers: [TagsService],
    exports: [TagsService],
})
export class TagsModule {}

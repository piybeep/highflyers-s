import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '@src/tags/tags.module';
import { TedTalk } from '@src/ted-talks/entities/ted-talk.entity';
import { TedTalksController } from './ted-talks.controller';
import { TedTalksService } from './ted-talks.service';

@Module({
    imports: [TypeOrmModule.forFeature([TedTalk]), TagsModule],
    controllers: [TedTalksController],
    providers: [TedTalksService],
})
export class TedTalksModule {}

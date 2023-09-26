import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@src/articles/entities/article.entity';
import { ExamContent } from '@src/exam-content/entities/exam-content.entity';
import { TedTalk } from '@src/ted-talks/entities/ted-talk.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;
    @ApiProperty()
    @Column()
    value: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => ExamContent, (exam_content) => exam_content.tags)
    exam_content: ExamContent;

    @ManyToOne(() => TedTalk, (ted_talk) => ted_talk.tags)
    ted_talk: TedTalk;

    @ManyToOne(() => Article, (article) => article.tags)
    article: Article;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '@src/exams/entities/exam.entity';
import { Tag } from '@src/tags/entities/tag.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExamContent {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    text: string;

    @ApiProperty()
    @Column()
    type: string;

    @ApiProperty({ type: () => Tag, isArray: true })
    @OneToMany(() => Tag, (tag) => tag.exam_content)
    tags: Tag[];

    @ApiProperty({ type: () => Exam })
    @ManyToOne(() => Exam, (exam) => exam.content)
    exam: Exam;
}

import { ApiProperty } from '@nestjs/swagger';
import { ExamContent } from '@src/exam-content/entities/exam-content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ExamsType {
    EGE = 'ege',
    OGE = 'oge',
}

export enum ExamsSubType {
    ORAL = 'oral',
    WRITTEN = 'written',
}

@Entity()
export class Exam {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty({ enum: ExamsType })
    @Column({
        type: 'enum',
        enum: ExamsType,
    })
    type: ExamsType;

    @ApiProperty({ enum: ExamsSubType })
    @Column({
        type: 'enum',
        enum: ExamsSubType,
    })
    subtype: ExamsSubType;

    @ApiProperty({ type: () => ExamContent, isArray: true })
    @OneToMany(() => ExamContent, (exam_content) => exam_content.exam)
    content: ExamContent[];
}

import { ApiProperty } from '@nestjs/swagger';
import { TestAnswer } from '@src/test-answers/entities/test-answer.entity';
import { Test } from '@src/tests/entities/test.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestContent {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    question: string;

    @ApiProperty()
    @OneToMany(() => TestAnswer, (test_answer) => test_answer.test)
    answers: TestAnswer[];

    @ManyToOne(() => Test, (group) => group.tests)
    group: Test;
}

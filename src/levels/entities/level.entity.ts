import { ApiProperty } from '@nestjs/swagger';
import { Card } from '@src/cards/entities/card.entity';
import { LessonPlan } from '@src/lesson-plans/entities/lesson-plan.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Level {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Card, (card) => card.level)
    cards: Card[];

    @OneToMany(() => LessonPlan, (plan) => plan.level)
    lesson_plans: LessonPlan[];
}

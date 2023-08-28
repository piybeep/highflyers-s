import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { LessonPlan } from '../../lesson-plans/entities/lesson-plan.entity';

@Entity()
export class Level {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Card, (card) => card.level)
    cards: Card[];

    @OneToMany(() => LessonPlan, (plan) => plan.level)
    lesson_plans: LessonPlan[];
}

import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { LearningResource } from '@src/learning-resources/entities/learning-resource.entity';

@Entity()
export class CheckList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    theme: string;

    @OneToMany(() => LearningResource, (resource) => resource.checkList)
    resources: LearningResource[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

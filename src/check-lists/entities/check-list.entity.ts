import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LearningResource } from '@src/learning-resources/entities/learning-resource.entity';

@Entity()
export class CheckList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    theme: string;

    @OneToMany(() => LearningResource, (resource) => resource.checkList)
    resources: LearningResource[];
}

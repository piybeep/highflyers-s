import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckList } from '@src/check-lists/entities/check-list.entity';

@Entity()
export class LearningResource {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    author: string;
    @Column()
    link: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => CheckList, (checkList) => checkList.resources)
    checkList: CheckList;
}

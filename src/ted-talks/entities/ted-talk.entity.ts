import { Tag } from '@src/tags/entities/tag.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TedTalk {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    @Column()
    theme: string;
    @Column()
    read_time: string;
    @Column()
    link: string;
    @Column()
    preview: string;

    @UpdateDateColumn()
    updatedAt: Date;
    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}

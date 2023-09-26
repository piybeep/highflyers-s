import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@src/tags/entities/tag.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    topic: string;

    @ApiProperty()
    @Column()
    text: string;

    @ApiProperty()
    @OneToMany(() => Tag, (tags) => tags.article)
    tags: Tag[];

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}

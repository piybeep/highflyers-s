import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;
    @ApiProperty()
    @Column()
    theme: string;
    @ApiProperty()
    @Column()
    read_time: string;
    @ApiProperty()
    @Column()
    link: string;
    @ApiProperty()
    @Column()
    preview: string;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ type: () => Tag, isArray: true })
    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}

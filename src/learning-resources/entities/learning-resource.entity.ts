import { ApiProperty } from '@nestjs/swagger';
import { CheckList } from '@src/check-lists/entities/check-list.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum LearningResourceTypes {
    BOOK = 'книга',
    PODCAST = 'подкаст',
    YOUTUBE = 'youtube',
}

@Entity()
export class LearningResource {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty()
    @Column()
    name: string;
    @ApiProperty()
    @Column({ nullable: true })
    author?: string;
    @ApiProperty()
    @Column()
    link: string;
    @ApiProperty({ type: () => LearningResourceTypes })
    @Column({ type: 'enum', enum: LearningResourceTypes })
    type: LearningResourceTypes;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ type: () => CheckList })
    @ManyToOne(() => CheckList, (checkList) => checkList.resources)
    checkList: CheckList;
}

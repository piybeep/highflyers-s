import { ApiProperty } from '@nestjs/swagger';
import { LearningResourcesGroup } from '@src/learning-resources-groups/entities/learning-resources-group.entity';
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
    @ApiProperty({ enum: LearningResourceTypes })
    @Column({ type: 'enum', enum: LearningResourceTypes })
    type: LearningResourceTypes;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ type: () => LearningResourcesGroup })
    @ManyToOne(() => LearningResourcesGroup, (group) => group.list)
    group: LearningResourcesGroup;
}

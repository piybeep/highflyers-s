import { ApiProperty } from '@nestjs/swagger';
import { LearningResourcesGroup } from '@src/learning-resources-groups/entities/learning-resources-group.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CheckList {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    theme: string;

    @ApiProperty()
    @Column('simple-array', { nullable: true })
    points: string[];

    @ApiProperty({ type: () => LearningResourcesGroup, isArray: true })
    @OneToMany(() => LearningResourcesGroup, (resource) => resource.checkList)
    resources: LearningResourcesGroup[];

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}

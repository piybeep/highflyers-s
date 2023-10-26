import { ApiProperty } from '@nestjs/swagger';
import { CheckList } from '@src/check-lists/entities/check-list.entity';
import { LearningResource } from '@src/learning-resources/entities/learning-resource.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LearningResourcesGroup {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty({ type: () => CheckList })
    @ManyToOne(() => CheckList, (checkList) => checkList.resources)
    checkList: CheckList;

    @ApiProperty({ type: () => LearningResource, isArray: true })
    @OneToMany(() => LearningResource, (resource) => resource.group)
    list: LearningResource[];

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}

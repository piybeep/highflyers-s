import { ApiProperty } from '@nestjs/swagger';
import { LearningResource } from '@src/learning-resources/entities/learning-resource.entity';
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

    @ApiProperty({ type: () => LearningResource, isArray: true })
    @OneToMany(() => LearningResource, (resource) => resource.checkList)
    resources: LearningResource[];

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}

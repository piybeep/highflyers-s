import { ApiProperty } from '@nestjs/swagger';
import { TestContent } from '@src/test-content/entities/test-content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TestTypes {
    SELECT = 'select',
    INSERT = 'insert',
    QUESTION = 'question',
    TEXT = 'text',
    MULTI_SELECT = 'multi-select',
}

@Entity()
export class Test {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty()
    @Column()
    title: string;
    @ApiProperty()
    @Column({ type: 'enum', enum: TestTypes })
    type: TestTypes;

    @ApiProperty()
    @OneToMany(() => TestContent, (test_content) => test_content.group)
    tests: TestContent[];
}

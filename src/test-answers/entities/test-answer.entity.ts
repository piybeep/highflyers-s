import { ApiProperty } from '@nestjs/swagger';
import { TestContent } from '@src/test-content/entities/test-content.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestAnswer {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    text: string;

    @ApiProperty()
    @Column()
    isRight: boolean;

    @ManyToOne(() => TestContent, (test) => test.answers)
    test: TestContent;
}

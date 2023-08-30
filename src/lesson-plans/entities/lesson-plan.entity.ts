import { ApiProperty } from '@nestjs/swagger';
import { Level } from '@src/levels/entities/level.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonPlan {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    read_time: string;

    @ApiProperty()
    @Column()
    isFree: boolean;

    @ApiProperty()
    @Column()
    link: string;

    @ApiProperty()
    @Column()
    preview: string;

    @ApiProperty({ type: () => Level })
    @ManyToOne(() => Level, (level) => level.lesson_plans)
    level: Level;
}

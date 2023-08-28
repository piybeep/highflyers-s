import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../../levels/entities/level.entity';

@Entity()
export class Card {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    read_time: string;

    @Column()
    isFree: boolean;

    @Column()
    link: string;

    @Column()
    preview: string;

    @ManyToOne(() => Level, (level) => level.cards)
    level: Level;
}

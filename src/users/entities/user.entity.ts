import { ApiProperty } from '@nestjs/swagger';
import { Card } from '@src/cards/entities/card.entity';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ nullable: true })
    first_name?: string;
    @ApiProperty()
    @Column({ nullable: true })
    second_name?: string;

    @ApiProperty()
    @Column()
    email: string;
    @Column({ nullable: true })
    @Exclude()
    password?: string;
    @Column({ nullable: true })
    @Exclude()
    google_id?: string;

    @Column({ nullable: true })
    @Exclude()
    resetCode?: string;
    @Column({ nullable: true })
    @Exclude()
    resetCodeExpiredIn?: Date;

    @ApiProperty()
    @Column({ default: false })
    isAdmin: boolean;

    @Column({ nullable: true })
    @Exclude()
    refreshToken: string;

    @ManyToMany(() => Card)
    @JoinTable()
    cards: Card[];
}

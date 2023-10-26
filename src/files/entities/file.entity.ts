import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    filename: string;
    @Column()
    size: number;
    @Column()
    type: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

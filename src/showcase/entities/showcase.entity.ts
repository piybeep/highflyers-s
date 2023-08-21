import { Category } from '../../categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Showcase {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  price: number;
  @ApiProperty()
  @Column()
  fullPrice: number;
  @ApiProperty()
  @Column('simple-array')
  points: string[];

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.showcases)
  category: Category;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  defaultPrice: number;
  @ApiProperty()
  @Column()
  discountPrice: number;

  @ApiProperty()
  @Column('text', { array: true })
  points: string[];

  @ApiProperty({ type: Category })
  @ManyToOne((type) => Category, (category) => category.services)
  category: Category;
}

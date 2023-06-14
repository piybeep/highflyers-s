import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}

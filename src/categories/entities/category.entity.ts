import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showcase } from '../../showcase/entities/showcase.entity';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: () => Showcase, isArray: true })
  @OneToMany(() => Showcase, (showcase) => showcase.category)
  showcases: Showcase[];
}

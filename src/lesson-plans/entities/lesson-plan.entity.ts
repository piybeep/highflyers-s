import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonPlan {
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
  level: string;

  @Column()
  preview: string;
}

import { Injectable } from '@nestjs/common';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';
import { LessonPlan } from './entities/lesson-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LessonPlansService {
  constructor(
    @InjectRepository(LessonPlan)
    private readonly lessonPlansRepository: Repository<LessonPlan>,
  ) {}

  create(createLessonPlanDto: CreateLessonPlanDto) {
    console.log(createLessonPlanDto);
    return 'This action adds a new lessonPlan';
  }

  findAll() {
    return this.lessonPlansRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} lessonPlan`;
  }

  update(id: string, updateLessonPlanDto: UpdateLessonPlanDto) {
    console.log(updateLessonPlanDto);
    return `This action updates a #${id} lessonPlan`;
  }

  remove(id: string) {
    return `This action removes a #${id} lessonPlan`;
  }
}

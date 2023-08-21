import { Injectable } from '@nestjs/common';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';

@Injectable()
export class LessonPlansService {
  create(createLessonPlanDto: CreateLessonPlanDto) {
    console.log(createLessonPlanDto);
    return 'This action adds a new lessonPlan';
  }

  findAll() {
    return `This action returns all lessonPlans`;
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

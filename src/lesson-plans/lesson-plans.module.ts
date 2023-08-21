import { Module } from '@nestjs/common';
import { LessonPlansService } from './lesson-plans.service';
import { LessonPlansController } from './lesson-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonPlan } from './entities/lesson-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonPlan])],
  controllers: [LessonPlansController],
  providers: [LessonPlansService],
})
export class LessonPlansModule {}

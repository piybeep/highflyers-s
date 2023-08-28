import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';
import { LessonPlan } from './entities/lesson-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelsService } from '../levels/levels.service';

@Injectable()
export class LessonPlansService {
    constructor(
        @InjectRepository(LessonPlan)
        private readonly lessonPlansRepository: Repository<LessonPlan>,
        private readonly levelsService: LevelsService,
    ) {}

    async create(createLessonPlanDto: CreateLessonPlanDto) {
        const level = await this.levelsService.findOne(
            createLessonPlanDto.level_id,
        );
        if (!level) {
            throw new NotFoundException();
        }
        const new_lesson_plan = this.lessonPlansRepository.create({
            ...createLessonPlanDto,
            level,
        });
        return this.lessonPlansRepository.save(new_lesson_plan);
    }

    findAll() {
        return this.lessonPlansRepository.find();
    }

    findOne(id: string) {
        return this.lessonPlansRepository.findOneBy({ id });
    }

    async update(id: string, updateLessonPlanDto: UpdateLessonPlanDto) {
        const existingLessonPlan = await this.findOne(id);
        if (!existingLessonPlan) {
            throw new NotFoundException('План уроков не найден');
        }
        const level = await this.levelsService.findOne(
            updateLessonPlanDto.level_id,
        );
        if (!level) {
            throw new NotFoundException();
        }
        await this.lessonPlansRepository.update(id, {
            ...updateLessonPlanDto,
            level,
        });
        return this.findOne(id);
    }

    async remove(id: string) {
        const existingLessonPlan = await this.findOne(id);
        if (!existingLessonPlan) {
            throw new NotFoundException('План уроков не найден');
        }
        await this.lessonPlansRepository.delete(id);
        return this.findOne(id);
    }
}

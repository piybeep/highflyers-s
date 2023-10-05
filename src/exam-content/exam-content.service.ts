import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExamContentDto } from '@src/exam-content/dto/create-exam-content.dto';
import { UpdateExamContentDto } from '@src/exam-content/dto/update-exam-content.dto';
import { ExamContent } from '@src/exam-content/entities/exam-content.entity';
import { ExamsService } from '@src/exams/exams.service';
import { TagsService } from '@src/tags/tags.service';
import { Repository } from 'typeorm';

@Injectable()
export class ExamContentService {
    constructor(
        @InjectRepository(ExamContent)
        private readonly examContentRepository: Repository<ExamContent>,
        private readonly examsService: ExamsService,
        private readonly tagsService: TagsService,
    ) {}

    async create(createExamContentDto: CreateExamContentDto) {
        const exam = await this.examsService.findOne(
            createExamContentDto.exam_id,
        );
        if (!exam) {
            throw new NotFoundException();
        }
        const tags = await this.tagsService.findManyByIds(
            createExamContentDto.tag_ids,
        );
        const new_exam_content = this.examContentRepository.create({
            ...createExamContentDto,
            tags,
            exam,
        });
        return this.examContentRepository.save(new_exam_content);
    }

    findAll() {
        return this.examContentRepository.find();
    }

    findOne(id: string) {
        return this.examContentRepository.findOneBy({ id });
    }

    async update(id: string, updateExamContentDto: UpdateExamContentDto) {
        const exam_content = await this.findOne(id);
        if (!exam_content) {
            throw new NotFoundException();
        }
        const exam =
            'exam_id' in updateExamContentDto
                ? await this.examsService.findOne(updateExamContentDto.exam_id)
                : exam_content.exam;
        if (!exam) {
            throw new NotFoundException();
        }

        const tags =
            'tag_ids' in updateExamContentDto
                ? await this.tagsService.findManyByIds(
                      updateExamContentDto.tag_ids,
                  )
                : exam_content.tags;
        await this.examContentRepository.update(id, {
            ...updateExamContentDto,
            tags,
        });
        return this.findOne(id);
    }

    async remove(id: string) {
        const exam_content = await this.findOne(id);
        if (!exam_content) {
            throw new NotFoundException();
        }
        await this.examContentRepository.delete(id);
        return exam_content;
    }
}

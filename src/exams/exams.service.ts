import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from '@src/exams/entities/exam.entity';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
    constructor(
        @InjectRepository(Exam)
        private readonly examRepository: Repository<Exam>,
    ) {}

    create(createExamDto: CreateExamDto) {
        const new_exam = this.examRepository.create(createExamDto);
        return this.examRepository.save(new_exam);
    }

    findAll() {
        return this.examRepository.find();
    }

    findOne(id: string) {
        return this.examRepository.findOneBy({ id });
    }

    async update(id: string, updateExamDto: UpdateExamDto) {
        const exam = this.findOne(id);
        if (!exam) {
            throw new NotFoundException();
        }
        await this.examRepository.update(id, updateExamDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const exam = this.findOne(id);
        if (!exam) {
            throw new NotFoundException();
        }
        await this.examRepository.delete(id);
        return exam;
    }
}

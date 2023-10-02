import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAnswer } from '@src/test-answers/entities/test-answer.entity';
import { In, Repository } from 'typeorm';
import { CreateTestAnswerDto } from './dto/create-test-answer.dto';
import { UpdateTestAnswerDto } from './dto/update-test-answer.dto';

@Injectable()
export class TestAnswersService {
    constructor(
        @InjectRepository(TestAnswer)
        private readonly testAnswerRepository: Repository<TestAnswer>,
    ) {}

    create(createTestAnswerDto: CreateTestAnswerDto) {
        const new_test_answer =
            this.testAnswerRepository.create(createTestAnswerDto);
        return this.testAnswerRepository.save(new_test_answer);
    }

    findAll() {
        return this.testAnswerRepository.find();
    }

    findOne(id: string) {
        return this.testAnswerRepository.findOneBy({ id });
    }

    async update(id: string, updateTestAnswerDto: UpdateTestAnswerDto) {
        const test_answer = await this.findOne(id);
        if (!test_answer) {
            throw new NotFoundException();
        }
        await this.testAnswerRepository.update(id, updateTestAnswerDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const test_answer = await this.findOne(id);
        if (!test_answer) {
            throw new NotFoundException();
        }
        await this.testAnswerRepository.delete(id);
        return test_answer;
    }

    findAllByIds(answers: string[]) {
        return this.testAnswerRepository.find({ where: { id: In(answers) } });
    }
}

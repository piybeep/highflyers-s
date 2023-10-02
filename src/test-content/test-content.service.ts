import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestAnswersService } from '@src/test-answers/test-answers.service';
import { TestContent } from '@src/test-content/entities/test-content.entity';
import { In, Repository } from 'typeorm';
import { CreateTestContentDto } from './dto/create-test-content.dto';
import { UpdateTestContentDto } from './dto/update-test-content.dto';

@Injectable()
export class TestContentService {
    constructor(
        @InjectRepository(TestContent)
        private readonly testContentRepository: Repository<TestContent>,
        private readonly testAnswersService: TestAnswersService,
    ) {}

    async create(createTestContentDto: CreateTestContentDto) {
        const answers = await this.testAnswersService.findAllByIds(
            createTestContentDto.answers,
        );
        if (!answers.length) {
            throw new NotFoundException();
        }
        const new_test_content = this.testContentRepository.create({
            ...createTestContentDto,
            answers,
        });
        return this.testContentRepository.save(new_test_content);
    }

    findAll() {
        return this.testContentRepository.find();
    }

    findOne(id: string) {
        return this.testContentRepository.findOneBy({ id });
    }

    async update(id: string, updateTestContentDto: UpdateTestContentDto) {
        const test_content = await this.findOne(id);
        if (!test_content) {
            throw new NotFoundException();
        }
        const answers =
            'answers' in updateTestContentDto
                ? await this.testAnswersService.findAllByIds(
                      updateTestContentDto.answers,
                  )
                : test_content.answers;
        await this.testContentRepository.update(id, {
            ...updateTestContentDto,
            answers,
        });
        return this.findOne(id);
    }

    async remove(id: string) {
        const test_content = await this.findOne(id);
        if (!test_content) {
            throw new NotFoundException();
        }
        await this.testContentRepository.delete(id);
        return test_content;
    }

    findAllByIds(tests: string[]) {
        return this.testContentRepository.find({ where: { id: In(tests) } });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestContentService } from '@src/test-content/test-content.service';
import { Test } from '@src/tests/entities/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestsService {
    constructor(
        @InjectRepository(Test)
        private readonly testRepository: Repository<Test>,
        private readonly testContentService: TestContentService,
    ) {}

    async create(createTestDto: CreateTestDto) {
        const test_content = await this.testContentService.findAllByIds(
            createTestDto.tests,
        );
        if (!test_content.length) {
            throw new NotFoundException();
        }
        const new_test = this.testRepository.create({
            ...createTestDto,
            tests: test_content,
        });
        return this.testRepository.save(new_test);
    }

    findAll() {
        return this.testRepository.find();
    }

    findOne(id: string) {
        return this.testRepository.findOneBy({ id });
    }

    async update(id: string, updateTestDto: UpdateTestDto) {
        const test = await this.findOne(id);
        if (!test) {
            throw new NotFoundException();
        }
        const tests =
            'tests' in updateTestDto
                ? await this.testContentService.findAllByIds(
                      updateTestDto.tests,
                  )
                : test.tests;
        await this.testRepository.update(id, {
            ...updateTestDto,
            tests,
        });
        return this.findOne(id);
    }

    async remove(id: string) {
        const test = await this.findOne(id);
        if (!test) {
            throw new NotFoundException();
        }
        await this.testRepository.delete(id);
        return test;
    }
}

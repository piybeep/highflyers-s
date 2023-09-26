import { Injectable } from '@nestjs/common';
import { CreateTestAnswerDto } from './dto/create-test-answer.dto';
import { UpdateTestAnswerDto } from './dto/update-test-answer.dto';

@Injectable()
export class TestAnswersService {
    create(createTestAnswerDto: CreateTestAnswerDto) {
        console.log(createTestAnswerDto);
        return 'This action adds a new testAnswer';
    }

    findAll() {
        return `This action returns all testAnswers`;
    }

    findOne(id: string) {
        return `This action returns a #${id} testAnswer`;
    }

    update(id: string, updateTestAnswerDto: UpdateTestAnswerDto) {
        console.log(updateTestAnswerDto);
        return `This action updates a #${id} testAnswer`;
    }

    remove(id: string) {
        return `This action removes a #${id} testAnswer`;
    }
}

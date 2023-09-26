import { Injectable } from '@nestjs/common';
import { CreateTestContentDto } from './dto/create-test-content.dto';
import { UpdateTestContentDto } from './dto/update-test-content.dto';

@Injectable()
export class TestContentService {
    create(createTestContentDto: CreateTestContentDto) {
        console.log(createTestContentDto);
        return 'This action adds a new testContent';
    }

    findAll() {
        return `This action returns all testContent`;
    }

    findOne(id: string) {
        return `This action returns a #${id} testContent`;
    }

    update(id: string, updateTestContentDto: UpdateTestContentDto) {
        console.log(updateTestContentDto);
        return `This action updates a #${id} testContent`;
    }

    remove(id: string) {
        return `This action removes a #${id} testContent`;
    }
}

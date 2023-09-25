import { Injectable } from '@nestjs/common';
import { CreateExamContentDto } from '@src/exam-content/dto/create-exam-content.dto';
import { UpdateExamContentDto } from '@src/exam-content/dto/update-exam-content.dto';

@Injectable()
export class ExamContentService {
    /*
    constructor(
        @InjectRepository(ExamContent)
        private readonly ExamContentRepository: Repository<ExamContent>,
        private readonly ExamsService: ExamsService,
    ) {}
    */

    create(createExamContentDto: CreateExamContentDto) {
        console.log(createExamContentDto);
        return 'This action adds a new examContent';
    }

    findAll() {
        return `This action returns all examContent`;
    }

    findOne(id: string) {
        return `This action returns a #${id} examContent`;
    }

    update(id: string, updateExamContentDto: UpdateExamContentDto) {
        console.log(updateExamContentDto);
        return `This action updates a #${id} examContent`;
    }

    remove(id: string) {
        return `This action removes a #${id} examContent`;
    }
}

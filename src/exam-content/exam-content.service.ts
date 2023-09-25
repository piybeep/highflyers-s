import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamContentService {
    /*
    constructor(
        @InjectRepository(ExamContent)
        private readonly ExamContentRepository: Repository<ExamContent>,
        private readonly ExamsService: ExamsService,
    ) {}
    */

    create(/*createExamContentDto: CreateExamContentDto*/) {
        return 'This action adds a new examContent';
    }

    findAll() {
        return `This action returns all examContent`;
    }

    findOne(id: string) {
        return `This action returns a #${id} examContent`;
    }

    update(id: string /*updateExamContentDto: UpdateExamContentDto*/) {
        return `This action updates a #${id} examContent`;
    }

    remove(id: string) {
        return `This action removes a #${id} examContent`;
    }
}

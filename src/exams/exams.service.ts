import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamsService {
    /*
     constructor(
         @InjectRepository(Exam)
         private readonly examRepository: Repository<Exam>,
     ) {}
     */
    create(/*createExamDto: CreateExamDto*/) {
        return 'This action adds a new exam';
    }

    findAll() {
        return `This action returns all exams`;
    }

    findOne(id: string) {
        return `This action returns a #${id} exam`;
    }

    update(id: string /*updateExamDto: UpdateExamDto*/) {
        return `This action updates a #${id} exam`;
    }

    remove(id: string) {
        return `This action removes a #${id} exam`;
    }
}

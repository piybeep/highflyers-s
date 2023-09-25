import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamContent } from '@src/exam-content/entities/exam-content.entity';
import { ExamsModule } from '@src/exams/exams.module';
import { ExamContentController } from './exam-content.controller';
import { ExamContentService } from './exam-content.service';

@Module({
    imports: [TypeOrmModule.forFeature([ExamContent]), ExamsModule],
    controllers: [ExamContentController],
    providers: [ExamContentService],
})
export class ExamContentModule {}

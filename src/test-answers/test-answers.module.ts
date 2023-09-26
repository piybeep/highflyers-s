import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAnswer } from '@src/test-answers/entities/test-answer.entity';
import { TestAnswersController } from './test-answers.controller';
import { TestAnswersService } from './test-answers.service';

@Module({
    imports: [TypeOrmModule.forFeature([TestAnswer])],
    controllers: [TestAnswersController],
    providers: [TestAnswersService],
    exports: [TestAnswersService],
})
export class TestAnswersModule {}

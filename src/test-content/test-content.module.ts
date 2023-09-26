import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAnswersModule } from '@src/test-answers/test-answers.module';
import { TestContent } from '@src/test-content/entities/test-content.entity';
import { TestContentController } from './test-content.controller';
import { TestContentService } from './test-content.service';

@Module({
    imports: [TypeOrmModule.forFeature([TestContent]), TestAnswersModule],
    controllers: [TestContentController],
    providers: [TestContentService],
    exports: [TestContentService],
})
export class TestContentModule {}

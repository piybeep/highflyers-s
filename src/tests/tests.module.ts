import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestContentModule } from '@src/test-content/test-content.module';
import { Test } from '@src/tests/entities/test.entity';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
    imports: [TypeOrmModule.forFeature([Test]), TestContentModule],
    controllers: [TestsController],
    providers: [TestsService],
})
export class TestsModule {}

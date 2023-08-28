import { Module } from '@nestjs/common';
import { CheckListsService } from './check-lists.service';
import { CheckListsController } from './check-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/check-list.entity';
import { LearningResourcesModule } from '@src/learning-resources/learning-resources.module';

@Module({
    imports: [TypeOrmModule.forFeature([CheckList]), LearningResourcesModule],
    controllers: [CheckListsController],
    providers: [CheckListsService],
})
export class CheckListsModule {}

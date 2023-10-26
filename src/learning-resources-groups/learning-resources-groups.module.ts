import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningResourcesGroup } from '@src/learning-resources-groups/entities/learning-resources-group.entity';
import { LearningResourcesModule } from '@src/learning-resources/learning-resources.module';
import { LearningResourcesGroupsController } from './learning-resources-groups.controller';
import { LearningResourcesGroupsService } from './learning-resources-groups.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([LearningResourcesGroup]),
        LearningResourcesModule,
    ],
    controllers: [LearningResourcesGroupsController],
    providers: [LearningResourcesGroupsService],
})
export class LearningResourcesGroupsModule {}

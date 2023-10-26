import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateLearningResourcesGroupDto } from './dto/create-learning-resources-group.dto';
import { UpdateLearningResourcesGroupDto } from './dto/update-learning-resources-group.dto';
import { LearningResourcesGroupsService } from './learning-resources-groups.service';

@Controller('learning-resources-groups')
export class LearningResourcesGroupsController {
    constructor(
        private readonly learningResourcesGroupsService: LearningResourcesGroupsService,
    ) {}

    @Post()
    create(
        @Body()
        createLearningResourcesGroupDto: CreateLearningResourcesGroupDto,
    ) {
        return this.learningResourcesGroupsService.create(
            createLearningResourcesGroupDto,
        );
    }

    @Get()
    findAll() {
        return this.learningResourcesGroupsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.learningResourcesGroupsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body()
        updateLearningResourcesGroupDto: UpdateLearningResourcesGroupDto,
    ) {
        return this.learningResourcesGroupsService.update(
            +id,
            updateLearningResourcesGroupDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.learningResourcesGroupsService.remove(+id);
    }
}

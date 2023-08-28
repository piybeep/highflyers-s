import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { LearningResourcesService } from './learning-resources.service';
import { UpdateLearningResourceDto } from './dto/update-learning-resource.dto';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { LearningResource } from '@src/learning-resources/entities/learning-resource.entity';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { AdminOnly } from '@src/common/decorators/adminOnly.decorator';

@ApiTags('Обучающие ресурсы')
@Controller('learning-resources')
export class LearningResourcesController {
    constructor(
        private readonly learningResourcesService: LearningResourcesService,
    ) {}

    @ApiOperation({
        summary: 'Получение всех обучающих ресурсов',
    })
    @ApiOkResponse({ type: LearningResource, isArray: true })
    @Get()
    findAll() {
        return this.learningResourcesService.findAll();
    }

    @ApiOperation({
        summary: 'Получение обучающего ресурса по идентификатору',
    })
    @ApiOkResponse({ type: LearningResource })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.learningResourcesService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение обучающего ресурса',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: LearningResource })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateLearningResourceDto: UpdateLearningResourceDto,
    ) {
        return this.learningResourcesService.update(
            id,
            updateLearningResourceDto,
        );
    }

    @ApiOperation({
        summary: 'Удаление обучающего ресурса',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: LearningResource })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.learningResourcesService.remove(id);
    }
}

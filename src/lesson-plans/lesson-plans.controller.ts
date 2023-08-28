import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { LessonPlansService } from './lesson-plans.service';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { LessonPlan } from './entities/lesson-plan.entity';

@ApiTags('Планы уроков')
@Controller('lesson-plans')
export class LessonPlansController {
    constructor(private readonly lessonPlansService: LessonPlansService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание нового плана уроков',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: LessonPlan })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createLessonPlanDto: CreateLessonPlanDto) {
        return this.lessonPlansService.create(createLessonPlanDto);
    }

    @ApiOperation({ summary: 'Получение всех планов урока' })
    @ApiOkResponse({ type: LessonPlan, isArray: true })
    @Get()
    findAll() {
        return this.lessonPlansService.findAll();
    }

    @ApiOperation({ summary: 'Получение плана уроков по идентификатору' })
    @ApiOkResponse({ type: LessonPlan })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lessonPlansService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение плана уроков',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: LessonPlan })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateLessonPlanDto: UpdateLessonPlanDto,
    ) {
        return this.lessonPlansService.update(id, updateLessonPlanDto);
    }

    @ApiOperation({
        summary: 'Удаление плана уроков',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: LessonPlan })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonPlansService.remove(id);
    }
}

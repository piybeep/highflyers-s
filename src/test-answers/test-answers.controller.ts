import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AdminOnly } from '@src/common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { TestAnswer } from '@src/test-answers/entities/test-answer.entity';
import { UpdateTestAnswerDto } from './dto/update-test-answer.dto';
import { TestAnswersService } from './test-answers.service';

@ApiTags('Ответы для вопросов')
@Controller('test-answers')
export class TestAnswersController {
    constructor(private readonly testAnswersService: TestAnswersService) {}

    @ApiOperation({ summary: 'Получение всех ответов для вопросов' })
    @ApiOkResponse({ type: TestAnswer, isArray: true })
    @Get()
    findAll() {
        return this.testAnswersService.findAll();
    }

    @ApiOperation({
        summary: 'Получение ответов для вопросов по идентификатору',
    })
    @ApiOkResponse({ type: TestAnswer })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testAnswersService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение ответов для вопросов',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TestAnswer })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTestAnswerDto: UpdateTestAnswerDto,
    ) {
        return this.testAnswersService.update(id, updateTestAnswerDto);
    }

    @ApiOperation({
        summary: 'Удаление ответов для вопросов',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TestAnswer })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testAnswersService.remove(id);
    }
}

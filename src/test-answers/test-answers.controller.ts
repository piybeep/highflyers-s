import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTestAnswerDto } from './dto/update-test-answer.dto';
import { TestAnswersService } from './test-answers.service';

@ApiTags('Ответы для вопросов')
@Controller('test-answers')
export class TestAnswersController {
    constructor(private readonly testAnswersService: TestAnswersService) {}

    @Get()
    findAll() {
        return this.testAnswersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testAnswersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTestAnswerDto: UpdateTestAnswerDto,
    ) {
        return this.testAnswersService.update(id, updateTestAnswerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testAnswersService.remove(id);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExamContentDto } from '@src/exam-content/dto/create-exam-content.dto';
import { UpdateExamContentDto } from '@src/exam-content/dto/update-exam-content.dto';
import { ExamContentService } from './exam-content.service';

@ApiTags('Экзамен')
@Controller('exam-content')
export class ExamContentController {
    constructor(private readonly examContentService: ExamContentService) {}

    @Post()
    create(@Body() createExamContentDto: CreateExamContentDto) {
        return this.examContentService.create(createExamContentDto);
    }

    @Get()
    findAll() {
        return this.examContentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.examContentService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateExamContentDto: UpdateExamContentDto,
    ) {
        return this.examContentService.update(id, updateExamContentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.examContentService.remove(id);
    }
}

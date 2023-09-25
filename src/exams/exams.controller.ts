import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
    constructor(private readonly examsService: ExamsService) {}

    @Post()
    create(/*@Body() createExamDto: CreateExamDto*/) {
        return this.examsService.create(/*createExamDto*/);
    }

    @Get()
    findAll() {
        return this.examsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.examsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string /*@Body() updateExamDto: UpdateExamDto*/) {
        return this.examsService.update(id /*updateExamDto*/);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.examsService.remove(id);
    }
}

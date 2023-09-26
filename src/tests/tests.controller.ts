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
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsService } from './tests.service';

@ApiTags('Группа тестов')
@Controller('tests')
export class TestsController {
    constructor(private readonly testsService: TestsService) {}

    @Post()
    create(@Body() createTestDto: CreateTestDto) {
        return this.testsService.create(createTestDto);
    }

    @Get()
    findAll() {
        return this.testsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
        return this.testsService.update(+id, updateTestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testsService.remove(+id);
    }
}

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
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AdminOnly } from '@src/common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { Test } from '@src/tests/entities/test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsService } from './tests.service';

@ApiTags('Группа тестов')
@Controller('tests')
export class TestsController {
    constructor(private readonly testsService: TestsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание новой группы тестов',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Test })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createTestDto: CreateTestDto) {
        return this.testsService.create(createTestDto);
    }

    @ApiOperation({ summary: 'Получение всех групп тестов' })
    @ApiOkResponse({ type: Test, isArray: true })
    @Get()
    findAll() {
        return this.testsService.findAll();
    }

    @ApiOperation({ summary: 'Получение группы тестов по идентификатору' })
    @ApiOkResponse({ type: Test })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение группы тестов',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Test })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
        return this.testsService.update(id, updateTestDto);
    }

    @ApiOperation({
        summary: 'Удаление группы тестов',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Test })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testsService.remove(id);
    }
}

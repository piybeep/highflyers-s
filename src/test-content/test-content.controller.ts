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
import { TestContent } from '@src/test-content/entities/test-content.entity';
import { CreateTestContentDto } from './dto/create-test-content.dto';
import { UpdateTestContentDto } from './dto/update-test-content.dto';
import { TestContentService } from './test-content.service';

@ApiTags('Тесты')
@Controller('test-content')
export class TestContentController {
    constructor(private readonly testContentService: TestContentService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание нового теста',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TestContent })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createTestContentDto: CreateTestContentDto) {
        return this.testContentService.create(createTestContentDto);
    }

    @ApiOperation({ summary: 'Получение всех тестов' })
    @ApiOkResponse({ type: TestContent, isArray: true })
    @Get()
    findAll() {
        return this.testContentService.findAll();
    }

    @ApiOperation({ summary: 'Получение теста по идентификатору' })
    @ApiOkResponse({ type: TestContent })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testContentService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение теста',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TestContent })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTestContentDto: UpdateTestContentDto,
    ) {
        return this.testContentService.update(id, updateTestContentDto);
    }

    @ApiOperation({
        summary: 'Удаление теста',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TestContent })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testContentService.remove(id);
    }
}

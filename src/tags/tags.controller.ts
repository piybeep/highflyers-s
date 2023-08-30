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
import { Tag } from '@src/tags/entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Теги')
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание нового тега',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Tag })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagsService.create(createTagDto);
    }

    @ApiOperation({ summary: 'Получение всех тегов' })
    @ApiOkResponse({ type: Tag, isArray: true })
    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @ApiOperation({ summary: 'Получение тега по идентификатору' })
    @ApiOkResponse({ type: Tag })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение тега',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Tag })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagsService.update(id, updateTagDto);
    }

    @ApiOperation({
        summary: 'Удаление тега',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Tag })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagsService.remove(id);
    }
}

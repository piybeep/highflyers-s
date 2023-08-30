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
import { TedTalk } from '@src/ted-talks/entities/ted-talk.entity';
import { CreateTedTalkDto } from './dto/create-ted-talk.dto';
import { UpdateTedTalkDto } from './dto/update-ted-talk.dto';
import { TedTalksService } from './ted-talks.service';

@ApiTags('TedTalks')
@Controller('ted-talks')
export class TedTalksController {
    constructor(private readonly tedTalksService: TedTalksService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание нового TedTalks',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TedTalk })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createTedTalkDto: CreateTedTalkDto) {
        return this.tedTalksService.create(createTedTalkDto);
    }

    @ApiOperation({ summary: 'Получение всех TedTalks' })
    @ApiOkResponse({ type: TedTalk, isArray: true })
    @Get()
    findAll() {
        return this.tedTalksService.findAll();
    }

    @ApiOperation({ summary: 'Получение TedTalks по идентификатору' })
    @ApiOkResponse({ type: TedTalk })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tedTalksService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение TedTalks',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TedTalk })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTedTalkDto: UpdateTedTalkDto,
    ) {
        return this.tedTalksService.update(id, updateTedTalkDto);
    }

    @ApiOperation({
        summary: 'Удаление TedTalks',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: TedTalk })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tedTalksService.remove(id);
    }
}

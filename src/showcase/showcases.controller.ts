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
import { ShowcasesService } from './showcases.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { Showcase } from './entities/showcase.entity';

@ApiTags('Витрина')
@Controller('showcases')
export class ShowcasesController {
    constructor(private readonly showcaseService: ShowcasesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание новой карточки категории',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Showcase })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createShowcaseDto: CreateShowcaseDto) {
        return this.showcaseService.create(createShowcaseDto);
    }

    @ApiOperation({ summary: 'Получение всех карточек категории' })
    @ApiOkResponse({ type: Showcase, isArray: true })
    @Get()
    findAll() {
        return this.showcaseService.findAll();
    }

    @ApiOperation({ summary: 'Получение карточки категории по идентификатору' })
    @ApiOkResponse({ type: Showcase })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.showcaseService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение карточки категории',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Showcase })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateShowcaseDto: UpdateShowcaseDto,
    ) {
        return this.showcaseService.update(id, updateShowcaseDto);
    }

    @ApiOperation({
        summary: 'Удаление карточки категории',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Showcase })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.showcaseService.remove(id);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('Карточки (обучение по карточкам)')
@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание новой карточки',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Card })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.create(createCardDto);
    }

    @ApiOperation({ summary: 'Получение всех карточек' })
    @ApiOkResponse({ type: Card, isArray: true })
    @Get()
    findAll(@Query('levels') levels: string) {
        return this.cardsService.findAll(levels);
    }

    @ApiOperation({ summary: 'Получение карточки по идентификатору' })
    @ApiOkResponse({ type: Card })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cardsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение карточки',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Card })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.update(id, updateCardDto);
    }

    @ApiOperation({
        summary: 'Удаление карточки',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Card })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cardsService.remove(id);
    }
}

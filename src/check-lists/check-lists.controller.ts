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
import { CheckListsService } from './check-lists.service';
import { CreateCheckListDto } from './dto/create-check-list.dto';
import { UpdateCheckListDto } from './dto/update-check-list.dto';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { AdminOnly } from '@src/common/decorators/adminOnly.decorator';
import { CheckList } from '@src/check-lists/entities/check-list.entity';

@ApiTags('Чек-листы')
@Controller('check-lists')
export class CheckListsController {
    constructor(private readonly checkListsService: CheckListsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание нового чек-листа',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: CheckList })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createCheckListDto: CreateCheckListDto) {
        return this.checkListsService.create(createCheckListDto);
    }

    @ApiOperation({ summary: 'Получение всех чек-листов' })
    @ApiOkResponse({ type: CheckList, isArray: true })
    @Get()
    findAll() {
        return this.checkListsService.findAll();
    }

    @ApiOperation({ summary: 'Получение чек-листа по идентификатору' })
    @ApiOkResponse({ type: CheckList })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.checkListsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение чек-листа',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: CheckList })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCheckListDto: UpdateCheckListDto,
    ) {
        return this.checkListsService.update(id, updateCheckListDto);
    }

    @ApiOperation({
        summary: 'Удаление чек-листа',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: CheckList })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.checkListsService.remove(id);
    }
}

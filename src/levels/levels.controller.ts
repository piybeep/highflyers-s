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
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { Level } from './entities/level.entity';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создание нового уровня',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Level })
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @ApiOperation({ summary: 'Получение всех уровней' })
  @ApiOkResponse({ type: Level, isArray: true })
  @Get()
  findAll() {
    return this.levelsService.findAll();
  }

  @ApiOperation({ summary: 'Получение уровня по идентификатору' })
  @ApiOkResponse({ type: Level })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Изменение уровня',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Level })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelsService.update(id, updateLevelDto);
  }

  @ApiOperation({
    summary: 'Удаление уровня',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Level })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(id);
  }
}

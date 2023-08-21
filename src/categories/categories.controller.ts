import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Создание новой категории',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Category })
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiOkResponse({ type: Category, isArray: true })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Получение категории по идентификатору' })
  @ApiOkResponse({ type: Category })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Изменение категории',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Category })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Удаление категории',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Category })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.categoriesService.remove(id);
  }
}

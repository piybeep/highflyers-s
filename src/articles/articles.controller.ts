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
import { Article } from '@src/articles/entities/article.entity';
import { AdminOnly } from '@src/common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Полезные статьи')
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Создание новой статьи',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Article })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @ApiOperation({ summary: 'Получение всех статей' })
    @ApiOkResponse({ type: Article, isArray: true })
    @Get()
    findAll() {
        return this.articlesService.findAll();
    }

    @ApiOperation({ summary: 'Получение статьи по идентификатору' })
    @ApiOkResponse({ type: Article })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articlesService.findOne(id);
    }

    @ApiOperation({
        summary: 'Изменение статьи',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Article })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return this.articlesService.update(id, updateArticleDto);
    }

    @ApiOperation({
        summary: 'Удаление статьи',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: Article })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articlesService.remove(id);
    }
}

import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AdminOnly } from '@src/common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '@src/common/guards/accessToken.guard';
import { FileEntity } from '@src/files/entities/file.entity';
import { FilesService } from './files.service';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Загрузка нового файла',
        description: 'Только для админов',
    })
    @ApiOkResponse({ type: FileEntity })
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    create(@UploadedFile('file') file: Express.Multer.File) {
        console.log('creating file', file);
        return this.filesService.create(file);
    }

    @ApiOperation({ summary: 'Получение всех файлов' })
    @ApiOkResponse({ type: FileEntity, isArray: true })
    @Get()
    findAll() {
        return this.filesService.findAll();
    }

    @ApiOperation({
        summary: 'Удаление файла',
        description: 'Только для админов',
    })
    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @AdminOnly(true)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.filesService.remove(id);
    }
}

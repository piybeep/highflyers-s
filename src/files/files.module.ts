import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '@src/files/entities/file.entity';
import e from 'express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'path';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileEntity]),
        MulterModule.register({
            dest: join(resolve(), 'upload'),
            storage: diskStorage({
                destination: (_req, _file, callback) => {
                    const uploadPath = join(resolve(), 'upload');

                    if (!existsSync(uploadPath)) {
                        mkdirSync(uploadPath);
                    }

                    callback(null, uploadPath);
                },
                filename(
                    _req: e.Request,
                    file: Express.Multer.File,
                    callback: (error: Error | null, filename: string) => void,
                ) {
                    callback(null, file.originalname);
                },
            }),
        }),
    ],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}

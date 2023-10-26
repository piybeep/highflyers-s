import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '@src/files/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly filesRepository: Repository<FileEntity>,
    ) {}

    create(file: Express.Multer.File) {
        const new_file = this.filesRepository.create({
            filename: file.originalname,
            size: file.size,
            type: file.mimetype,
        });
        return this.filesRepository.save(new_file);
    }

    findAll() {
        return this.filesRepository.find();
    }

    findOne(id: string) {
        return this.filesRepository.findOneBy({ id });
    }

    remove(id: string) {
        const file = this.findOne(id);
        if (!file) {
            throw new NotFoundException();
        }
        return { message: 'Файл удалён' };
    }
}

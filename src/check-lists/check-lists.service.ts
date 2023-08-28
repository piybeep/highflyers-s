import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckListDto } from './dto/create-check-list.dto';
import { UpdateCheckListDto } from './dto/update-check-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckList } from '@src/check-lists/entities/check-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckListsService {
    constructor(
        @InjectRepository(CheckList)
        private readonly checkListRepository: Repository<CheckList>,
    ) {}

    create(createCheckListDto: CreateCheckListDto) {
        const new_check_list =
            this.checkListRepository.create(createCheckListDto);
        return this.checkListRepository.save(new_check_list);
    }

    findAll() {
        return this.checkListRepository.findAndCount();
    }

    findOne(id: string) {
        return this.checkListRepository.findOneBy({ id });
    }

    async update(id: string, updateCheckListDto: UpdateCheckListDto) {
        const existing_check_list = await this.findOne(id);
        if (!existing_check_list) {
            throw new NotFoundException('Чек-лист не найден');
        }
        await this.checkListRepository.update(id, updateCheckListDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const existing_check_list = await this.findOne(id);
        if (!existing_check_list) {
            throw new NotFoundException('Чек-лист не найден');
        }
        return this.checkListRepository.delete(id);
    }
}

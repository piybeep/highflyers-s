import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly LevelRepository: Repository<Level>,
  ) {}

  create(createLevelDto: CreateLevelDto) {
    const new_level = this.LevelRepository.create(createLevelDto);
    return this.LevelRepository.save(new_level);
  }

  findAll() {
    return this.LevelRepository.find();
  }

  findOne(id: string) {
    return this.LevelRepository.findOneBy({ id });
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    const existing_level = this.findOne(id);
    if (!existing_level) {
      throw new NotFoundException();
    }
    await this.LevelRepository.update(id, updateLevelDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const existing_level = this.findOne(id);
    if (!existing_level) {
      throw new NotFoundException();
    }
    await this.LevelRepository.delete(id);
    return existing_level;
  }
}

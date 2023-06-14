import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly categoriesService: CategoriesService,
  ) {}

  @UseGuards(AccessTokenGuard)
  async create({ categoryId, ...createServiceDto }: CreateServiceDto) {
    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    const new_service = this.servicesRepository.create({
      ...createServiceDto,
      category,
    });
    await this.servicesRepository.save(new_service);
    return new_service;
  }

  findAll() {
    return this.servicesRepository.find({ relations: ['category'] });
  }

  async findOne(id: string) {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!service) {
      throw new NotFoundException(`Услуга не найдена`);
    }
    return service;
  }

  @UseGuards(AccessTokenGuard)
  async update(
    id: string,
    { categoryId, ...updateServiceDto }: UpdateServiceDto,
  ) {
    const service = await this.findOne(id);
    if (!service) {
      throw new NotFoundException(`Услуга не найдена`);
    }
    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Категория не найдена');
      }
      await this.servicesRepository.update(id, {
        ...updateServiceDto,
        category,
      });
    } else {
      await this.servicesRepository.update(id, updateServiceDto);
    }
    return this.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  async remove(id: string) {
    const service = await this.findOne(id);
    if (!service) {
      throw new NotFoundException(`Услуга не найдена`);
    }
    await this.servicesRepository.delete(id);
    return service;
  }
}

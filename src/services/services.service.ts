import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  @UseGuards(AccessTokenGuard)
  async create(createServiceDto: CreateServiceDto) {
    const new_service = this.servicesRepository.create(createServiceDto);
    await this.servicesRepository.save(new_service);
    return new_service;
  }

  findAll() {
    return this.servicesRepository.find();
  }

  async findOne(id: string) {
    const service = await this.servicesRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Услуга не найдена`);
    }
    return service;
  }

  @UseGuards(AccessTokenGuard)
  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    if (!service) {
      throw new NotFoundException(`Услуга не найдена`);
    }
    await this.servicesRepository.update(id, updateServiceDto);
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

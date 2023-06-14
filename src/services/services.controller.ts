import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Service } from './entities/service.entity';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @AdminOnly(true)
  @ApiOperation({ summary: 'Создание новой услуги' })
  @ApiCreatedResponse({ type: Service })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiOperation({ summary: 'Получение всех услуг' })
  @ApiOkResponse({ type: Service, isArray: true })
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiOperation({ summary: 'Получение услуги по идентификатору' })
  @ApiOkResponse({ type: Service })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @AdminOnly(true)
  @ApiOperation({ summary: 'Изменение данных услуги' })
  @ApiOkResponse({ type: Service })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @AdminOnly(true)
  @ApiOperation({ summary: 'Удаление услуги' })
  @ApiOkResponse({ type: Service })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}

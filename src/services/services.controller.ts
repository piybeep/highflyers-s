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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Service } from './entities/service.entity';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @ApiOperation({
    summary: 'Создание новой услуги',
    description: 'Только для админов',
  })
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
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.servicesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @ApiOperation({
    summary: 'Изменение данных услуги',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Service })
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @ApiOperation({
    summary: 'Удаление услуги',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: Service })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.servicesService.remove(id);
  }
}

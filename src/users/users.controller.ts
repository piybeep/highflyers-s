import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllDto } from './dto/get-all.dto';
import { User } from './entities/User.entity';
import { GetAllUsersResponseDto } from './dto/responses.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiOkResponse({ type: GetAllUsersResponseDto })
  @Get()
  findAll(@Query() dto: GetAllDto) {
    return this.usersService.getAll(dto);
  }

  @ApiOperation({ summary: 'Получение пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Обновление данных пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.remove(id);
  }
}

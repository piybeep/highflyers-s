import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllDto } from './dto/get-all.dto';
import { User } from './entities/user.entity';
import { GetAllUsersResponseDto } from './dto/responses.dto';
import { AdminOnly } from '../common/decorators/adminOnly.decorator';
import { MakeAdminDto } from './dto/make-admin.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { Request } from 'express';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  // @AdminOnly(true)
  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiOkResponse({ type: GetAllUsersResponseDto })
  @Get()
  findAll(@Query() dto: GetAllDto) {
    return this.usersService.getAll(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получение пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
  ) {
    if (id !== req.user['id'] && !req.user['isAdmin']) {
      throw new ForbiddenException();
    }
    return this.usersService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Обновление данных пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ) {
    if (id !== req.user['id'] && !req.user['isAdmin']) {
      throw new ForbiddenException();
    }
    return this.usersService.update(id, dto);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
  ) {
    if (id !== req.user['id'] && !req.user['isAdmin']) {
      throw new ForbiddenException();
    }
    return this.usersService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Выдача пользователю прав администратора',
    description: 'Только для админов',
  })
  @ApiOkResponse({ type: User })
  @UseGuards(AccessTokenGuard)
  @AdminOnly(true)
  @Patch(':id/makeadmin')
  makeAdmin(@Param('id') id: string, @Body() dto: MakeAdminDto) {
    return this.usersService.makeAdmin(id, dto.reverse);
  }
}

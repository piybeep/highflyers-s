import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RecoveryRequestDto } from './dto/recovery-request.dto';
import { RecoveryWithCodeDto } from './dto/recovery-w-code.dto';
import { SignResponseDto } from './dto/responses.dto';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@ApiTags('Аунтификация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистриация нового пользователя' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    type: SignResponseDto,
  })
  @Post()
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({ type: SignResponseDto })
  @Put()
  async signin(@Body() authDto: AuthDto) {
    return await this.authService.signIn(authDto);
  }

  @ApiOperation({ summary: 'Запрос на восстановление пароля' })
  @ApiOkResponse()
  @Post('recovery')
  async recoveryRequest(@Body() dto: RecoveryRequestDto) {
    return this.authService.recovery(dto.email);
  }

  @ApiOperation({ summary: 'Изменение пароля с помощью кода восстановления' })
  @ApiOkResponse({ type: SignResponseDto })
  @Patch('recovery')
  async recoveryAccount(@Body() dto: RecoveryWithCodeDto) {
    return this.authService.recoveryWithCode(dto);
  }

  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AccessTokenGuard)
  @Delete()
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({ type: SignResponseDto })
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('google')
  async googleSignin(@Body('code') code: string) {
    const { tokens } = await client.getToken(code);

    console.log(tokens);
  }
}

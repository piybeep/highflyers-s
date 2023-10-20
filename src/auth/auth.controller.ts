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
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GoogleSignDto } from './dto/google.dto';
import { RecoveryRequestDto } from './dto/recovery-request.dto';
import { RecoveryWithCodeDto } from './dto/recovery-w-code.dto';
import { SignResponseDto } from './dto/responses.dto';

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
        return this.authService.signIn(authDto);
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
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user['id']);
    }

    @ApiOperation({ summary: 'Обновление токенов' })
    @ApiBearerAuth()
    @UseGuards(RefreshTokenGuard)
    @ApiOkResponse({ type: SignResponseDto })
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req.user['id'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @ApiOperation({ summary: 'Google аунтификация' })
    @ApiOkResponse({ type: SignResponseDto })
    @Post('google')
    async googleSign(@Body() { token }: GoogleSignDto) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub, email, given_name, family_name } = ticket.getPayload();

        return this.authService.googleSign({
            google_id: sub,
            email,
            first_name: given_name,
            second_name: family_name,
        });
    }
}

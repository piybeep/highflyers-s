import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { isEmpty } from 'class-validator';
import { randomBytes } from 'crypto';
import { EmailService } from 'src/email/email.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { GoogleDto } from './dto/google.dto';
import { RecoveryWithCodeDto } from './dto/recovery-w-code.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private emailService: EmailService,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const userExists = await this.usersService.findByEmail(
            createUserDto.email,
        );
        if (userExists) {
            throw new BadRequestException(
                'Пользователь с такой почтой уже зарегистрирован',
            );
        }
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(
            newUser.id,
            newUser.email,
            newUser.isAdmin,
        );
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return { ...tokens, user: newUser };
    }

    async signIn(data: AuthDto) {
        const user = await this.usersService.findByEmail(data.email);
        if (!user) throw new BadRequestException('Неверная почта или пароль');
        if (!user.password) {
            throw new ForbiddenException(
                'Пароль не установлен. Авторизация только через Google',
            );
        }
        const passwordMatches = await argon2.verify(
            user.password,
            data.password,
        );
        if (!passwordMatches)
            throw new BadRequestException('Неверная почта или пароль');
        const tokens = await this.getTokens(user.id, user.email, user.isAdmin);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return { ...tokens, user };
    }

    async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
    }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId: string, username: string, isAdmin: boolean) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: userId,
                    username,
                    isAdmin,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '20s',
                },
            ),
            this.jwtService.signAsync(
                {
                    id: userId,
                    username,
                    isAdmin,
                },
                {
                    secret: this.configService.get<string>(
                        'JWT_REFRESH_SECRET',
                    ),
                    expiresIn: '30d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken) throw new ForbiddenException();
        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException();
        const tokens = await this.getTokens(user.id, user.email, user.isAdmin);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return { ...tokens, user };
    }

    async recovery(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        /*const user_with_code =*/
        await this.usersService.update(user.id, {
            resetCode: this.genResetCode(),
            resetCodeExpiredIn: new Date(
                Date.now() +
                    1000 /* 1 sec */ *
                        60 /* 1 min */ *
                        60 /* 1 hour */ *
                        24 /* 1 day */,
            ),
        });
        // TODO
        // await this.emailService.sendRecoveryMessage(user_with_code);
    }

    async recoveryWithCode(dto: RecoveryWithCodeDto) {
        const user = await this.usersService.findById(dto.id);
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        if (isEmpty(user.resetCode) || user.resetCode !== dto.code) {
            throw new BadRequestException('Неверный код восстановления');
        }
        if (user.resetCodeExpiredIn < new Date()) {
            throw new BadRequestException(
                'Время жизни кода восстановления истекло',
            );
        }
        const hash = await this.hashData(dto.new_password);
        const updatedUser = await this.usersService.update(user.id, {
            password: hash,
            resetCode: null,
            resetCodeExpiredIn: null,
        });
        const tokens = await this.getTokens(
            updatedUser.id,
            updatedUser.email,
            updatedUser.isAdmin,
        );
        await this.updateRefreshToken(updatedUser.id, tokens.refreshToken);
        return { ...tokens, user: updatedUser };
    }

    genResetCode() {
        return randomBytes(20).toString('hex');
    }

    async googleSign(payload: GoogleDto) {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) {
            const newUser = await this.usersService.create(payload);
            const tokens = await this.getTokens(
                newUser.id,
                newUser.email,
                newUser.isAdmin,
            );
            await this.updateRefreshToken(newUser.id, tokens.refreshToken);
            return { ...tokens, user: newUser };
        }

        const tokens = await this.getTokens(user.id, user.email, user.isAdmin);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return { ...tokens, user };
    }
}

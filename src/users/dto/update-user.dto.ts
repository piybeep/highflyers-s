import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiHideProperty()
  resetCode?: string;
  @ApiHideProperty()
  resetCodeExpiredIn?: Date;

  @ApiPropertyOptional({ description: 'Имя пользователя', example: 'Иванов' })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  first_name?: string;
  @ApiPropertyOptional({ description: 'Фамилия пользователя', example: 'Иван' })
  @IsOptional()
  @IsString({ message: 'Фамилия должна быть строкой' })
  second_name?: string;

  @ApiPropertyOptional({
    description: 'Почта пользователя для входа и восстановления пароля',
    example: 'test@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
  @ApiPropertyOptional({
    description: 'Пароль пользователя для входа в аккаунт',
    example: 'Str0ngPa55',
  })
  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 5,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
    },
    {
      message:
        'Пароль слишком простой (минимум 5 символов, из которых хотя бы 1 число, 1 маленькая буква и 1 большая буква)',
    },
  )
  password?: string;

  @ApiHideProperty()
  refreshToken?: string;
}

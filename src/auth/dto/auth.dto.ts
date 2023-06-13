import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Почта пользователя для входа и восстановления пароля',
    example: 'test@example.com',
  })
  @IsNotEmpty({ message: 'Отсутствует почта' })
  @IsEmail({}, { message: 'Невалидная почта' })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя для входа в аккаунт',
    example: 'Str0ngPa55',
  })
  @IsNotEmpty({ message: 'Отсутствует пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}

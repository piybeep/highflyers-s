import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoveryRequestDto {
  @ApiProperty({
    description: 'Почта для отправки письма с восстановлением пароля',
    example: 'test@example.com',
  })
  @IsNotEmpty({ message: 'Отсутствует почта' })
  @IsEmail({}, { message: 'Невалидная почта' })
  email: string;
}

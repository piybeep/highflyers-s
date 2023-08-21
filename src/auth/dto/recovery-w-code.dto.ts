import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class RecoveryWithCodeDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: 'b47ebf00-4f82-4a56-b00e-c2f4ed6b2a41',
  })
  @IsNotEmpty({ message: 'Отсутствует идентификатор' })
  @IsUUID('4', { message: 'Идентификатор должен соответствовать UUIDv4' })
  id: string;

  @ApiProperty({
    description: 'Код восстановления пароля',
    example: '8220da6c56bfbb752c51ad3c6c8c3e41341317d6',
  })
  @IsNotEmpty({ message: 'Отсутствует код восстановления' })
  @IsString({ message: 'Код восстановления должен быть строкой' })
  code: string;

  @ApiProperty({
    description: 'Новый пароль',
    example: 'Str0ngPa55',
  })
  @IsNotEmpty({ message: 'Отсутствует новый пароль' })
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
        'Такой пароль даже моя бабушка за 3 секунды взломает с закрытыми глазами. Придумай что нибудь посложнее! (минимум 5 символов, из которых хотя бы 1 число, 1 маленькая буква и 1 большая буква)',
    },
  )
  new_password: string;
}

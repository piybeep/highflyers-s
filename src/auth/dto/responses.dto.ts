import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class SignResponseDto {
    @ApiProperty({ description: 'Токен доступа' })
    accessToken: string;
    @ApiProperty({ description: 'Токен обновления' })
    refreshToken: string;
    @ApiProperty({ description: 'Данные пользователя' })
    user: User;
}

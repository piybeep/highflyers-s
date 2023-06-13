import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/User.entity';

export class SignResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  user: User;
}

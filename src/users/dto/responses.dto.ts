import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/User.entity';

export class GetAllUsersResponseDto {
  @ApiProperty({ type: [User] })
  users: User[];

  @ApiProperty()
  count: number;
}

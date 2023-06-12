import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional()
  first_name?: string;
  @ApiPropertyOptional()
  second_name?: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;

  @ApiHideProperty()
  refreshToken: string;
}

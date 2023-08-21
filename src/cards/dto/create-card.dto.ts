import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  read_time: string;

  @ApiPropertyOptional()
  isFree?: boolean;

  @ApiProperty()
  link: string;

  @ApiProperty()
  level: string;
}

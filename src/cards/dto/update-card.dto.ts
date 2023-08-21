import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  read_time: string;

  @ApiPropertyOptional()
  isFree?: boolean;

  @ApiPropertyOptional()
  link: string;

  @ApiPropertyOptional()
  level: string;
}

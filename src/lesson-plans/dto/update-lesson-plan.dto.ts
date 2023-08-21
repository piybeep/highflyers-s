import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLessonPlanDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  read_time?: string;

  @ApiPropertyOptional()
  isFree?: boolean;

  @ApiPropertyOptional()
  link?: string;

  @ApiPropertyOptional()
  level?: string;
}

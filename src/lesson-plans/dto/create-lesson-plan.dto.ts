import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonPlanDto {
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

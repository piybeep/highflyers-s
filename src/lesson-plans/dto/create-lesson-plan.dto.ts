import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class CreateLessonPlanDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    read_time: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isFree?: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    link: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    level_id: string;
}

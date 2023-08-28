import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class UpdateLessonPlanDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    read_time?: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isFree?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    link?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    level_id?: string;
}

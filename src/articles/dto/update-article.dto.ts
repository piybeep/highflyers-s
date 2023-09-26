import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateArticleDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    topic?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    text?: string;

    @ApiPropertyOptional()
    @IsString({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    tags?: string[];
}

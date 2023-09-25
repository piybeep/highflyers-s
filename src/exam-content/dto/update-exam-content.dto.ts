import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateExamContentDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    text: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    tag_ids: string[];

    @ApiPropertyOptional()
    @IsUUID('all')
    @IsNotEmpty()
    @IsOptional()
    exam_id: string;
}

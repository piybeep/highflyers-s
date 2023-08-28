import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShowcaseDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsPositive()
    @IsNumber()
    fullPrice?: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    @IsNotEmpty({ each: true })
    points?: string[];
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsUUID()
    category_id?: string;
}

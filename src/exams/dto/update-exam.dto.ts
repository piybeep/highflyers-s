import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    subtype: string;
}

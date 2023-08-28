import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateLearningResourceDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    link?: string;
}

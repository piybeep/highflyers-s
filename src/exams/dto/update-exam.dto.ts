import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExamsSubType, ExamsType } from '@src/exams/entities/exam.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type?: ExamsType;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    subtype?: ExamsSubType;
}

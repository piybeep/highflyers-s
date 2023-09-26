import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTestAnswerDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    text?: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isRight?: boolean;
}

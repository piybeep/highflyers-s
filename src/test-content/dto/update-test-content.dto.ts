import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateTestContentDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    question?: string;

    @ApiPropertyOptional()
    @IsString({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    answers?: string[];
}

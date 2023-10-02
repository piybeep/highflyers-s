import { ApiPropertyOptional } from '@nestjs/swagger';
import { TestTypes } from '@src/tests/entities/test.entity';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateTestDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsEnum(TestTypes)
    @IsOptional()
    type?: TestTypes;

    @ApiPropertyOptional()
    @IsString({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    tests?: string[];
}

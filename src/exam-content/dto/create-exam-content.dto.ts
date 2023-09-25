import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateExamContentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    tag_ids: string[];

    @ApiProperty()
    @IsUUID('all')
    @IsNotEmpty()
    exam_id: string;
}

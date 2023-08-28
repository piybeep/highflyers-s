import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class CreateCardDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    read_time: string;

    @ApiPropertyOptional()
    @IsBoolean()
    isFree?: boolean;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    link: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    level_id: string;
}

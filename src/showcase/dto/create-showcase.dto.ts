import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowcaseDto {
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    price: number;
    @ApiProperty()
    @IsPositive()
    @IsNumber()
    fullPrice: number;
    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsNotEmpty({ each: true })
    points: string[];
    @ApiProperty()
    @IsString()
    @IsUUID()
    category_id: string;
}

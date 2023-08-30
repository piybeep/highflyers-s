import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';

export class UpdateShowcaseDto {
    @ApiPropertyOptional({
        description: 'Цена за материал',
        example: 999,
    })
    @IsOptional()
    @IsNumber(
        {},
        { message: 'Цена за материал должна быть целочисленным числом' },
    )
    price?: number;
    @ApiPropertyOptional({
        description: 'Цена за курс',
        example: 4899,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Цена за курс должна быть целочисленным числом' })
    @IsPositive({ message: 'Цена за курс должна быть больше 0' })
    fullPrice?: number;
    @ApiPropertyOptional({
        description: 'Содержимое курса',
        example: ['Прокачайте уровень языка', 'Актуальные задания'],
    })
    @IsOptional()
    @IsString({
        each: true,
        message: 'Содержимое массива должны быть строками',
    })
    @IsArray({
        message: 'Содержимое курса должно быть массивом',
    })
    @IsNotEmpty({
        each: true,
        message: 'Содержимое курса не должно быть пустым',
    })
    points?: string[];
    @ApiPropertyOptional({
        description: 'Идентификатор категории',
        example: 'b47ebf00-4f82-4a56-b00e-c2f4ed6b2a41',
    })
    @IsOptional()
    @IsString({
        message: 'Идентификатор категории должен быть строкой',
    })
    @IsUUID('4', {
        message: 'Идентификатор категории должен быть формата UUIDv4',
    })
    category_id?: string;
}

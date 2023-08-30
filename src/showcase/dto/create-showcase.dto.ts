import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateShowcaseDto {
    @ApiProperty({
        description: 'Цена за материал',
        example: 999,
    })
    @IsNumber(
        {},
        { message: 'Цена за материал должна быть целочисленным числом' },
    )
    @IsPositive({ message: 'Цена за материал должна быть больше 0' })
    price: number;
    @ApiProperty({
        description: 'Цена за курс',
        example: 4899,
    })
    @IsNumber({}, { message: 'Цена за курс должна быть целочисленным числом' })
    @IsPositive({ message: 'Цена за курс должна быть больше 0' })
    fullPrice: number;
    @ApiProperty({
        description: 'Содержимое курса',
        example: ['Прокачайте уровень языка', 'Актуальные задания'],
    })
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
    points: string[];
    @ApiProperty({
        description: 'Идентификатор категории',
        example: 'b47ebf00-4f82-4a56-b00e-c2f4ed6b2a41',
    })
    @IsString({
        message: 'Идентификатор категории должен быть строкой',
    })
    @IsUUID('4', {
        message: 'Идентификатор категории должен быть формата UUIDv4',
    })
    category_id: string;
}

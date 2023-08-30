import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class UpdateCardDto {
    @ApiPropertyOptional({
        description: 'Название карточки',
        example: 'Глагол "быть" в будущем',
    })
    @IsOptional()
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не должно быть пустым' })
    name?: string;

    @ApiPropertyOptional({
        description: 'Время изучения',
        example: '40 минут',
    })
    @IsOptional()
    @IsString({ message: 'Время изучения должно быть строкой' })
    @IsNotEmpty({ message: 'Время изучения не должно быть пустым' })
    read_time?: string;

    @ApiPropertyOptional({
        description: 'Является ли карточка бесплатной',
        example: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Поле isFree может быть только true или false' })
    isFree?: boolean;

    @ApiPropertyOptional({
        description: 'Ссылка на материал карточки',
        example: 'http://example.com/lesson-1.pdf',
    })
    @IsOptional()
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsNotEmpty({ message: 'Ссылка не может быть пустой' })
    @IsUrl({}, { message: 'Ссылка должна быть валидной' })
    link?: string;

    @ApiPropertyOptional({
        description: 'Идентификатор уровня',
        example: 'b47ebf00-4f82-4a56-b00e-c2f4ed6b2a41',
    })
    @IsOptional()
    @IsString({ message: 'Идентификатор уровня должен быть строкой' })
    @IsNotEmpty({ message: 'Идентификатор уровня не может быть пустым' })
    @IsUUID('4', { message: 'Идентификатор уровня должен быть формата UUIDv4' })
    level_id?: string;
}

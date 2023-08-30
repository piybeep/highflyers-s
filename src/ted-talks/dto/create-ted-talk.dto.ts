import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateTedTalkDto {
    @ApiProperty({
        description: 'Название TedTalks',
        example: 'Правильные и неправильные глаголы',
    })
    @IsString({
        message: 'Название должно быть строкой',
    })
    @IsNotEmpty({
        message: 'Название не может быть пустым',
    })
    name: string;

    @ApiProperty({
        description: 'Тема TedTalks',
        example: 'Грамматика',
    })
    @IsString({
        message: 'Тема должна быть строкой',
    })
    @IsNotEmpty({
        message: 'Тема не может быть пустой',
    })
    theme: string;

    @ApiProperty({
        description: 'Время изучения',
        example: '40 минут',
    })
    @IsString({ message: 'Время изучения должно быть строкой' })
    @IsNotEmpty({ message: 'Время изучения не может быть пустым' })
    read_time: string;

    @ApiProperty({
        description: 'Ссылка на TedTalks',
        example: 'http://example.com/tedtalks-1.mp4',
    })
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsNotEmpty({ message: 'Ссылка не может быть пустой' })
    @IsUrl({}, { message: 'Ссылка должна быть валидной' })
    link: string;

    @ApiProperty({
        description: 'Ссылка на обложку (с-во может быть удалено)',
        example: 'http://example.com/tedtalks-1.jpeg',
    })
    @IsString({ message: 'Ссылка на обложку должна быть строкой' })
    @IsNotEmpty({ message: 'Ссылка на обложку не может быть пустой' })
    @IsUrl({}, { message: 'Ссылка на обложку должна быть валидной' })
    preview: string;

    @ApiProperty({
        description: 'Идентификаторы тегов',
        example: ['b47ebf00-4f82-4a56-b00e-c2f4ed6b2a41'],
    })
    @IsArray({ message: 'Поле с идентификаторами тегов должно быть массиом' })
    @IsUUID('4', {
        each: true,
        message: 'Идентификаторы тегов должны быть формата UUIDv4',
    })
    tags: string[];
}

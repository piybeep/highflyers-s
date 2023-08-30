import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLearningResourceDto {
    @ApiProperty({
        description: 'Название обучающего ресурса',
        example: 'Puzzle English',
    })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    name: string;
    @ApiPropertyOptional({
        description: 'Автор обучающего ресурса',
        example: 'Оскар Уайльд',
    })
    @IsOptional()
    @IsString({ message: 'Поле с автором должно быть строкой' })
    @IsNotEmpty({ message: 'Поле с автором не может быть пустым' })
    author?: string;
    @ApiProperty({
        description: 'Ссылка на источник',
        example: 'http://example.com/video.mp4',
    })
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsNotEmpty({ message: 'Ссылка не может быть пустой' })
    @IsUrl({}, { message: 'Невалидная ссылка' })
    link: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Имя категории', example: 'Планы уроков' })
    @IsNotEmpty({ message: 'Имя категории не может быть пустым' })
    @IsString({ message: 'Имя категории должен быть строкой' })
    name: string;
}

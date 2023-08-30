import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ description: 'Имя категории', example: 'Планы уроков' })
    @IsNotEmpty({ message: 'Имя категории не может быть пустым' })
    @IsString({ message: 'Имя категории должен быть строкой' })
    name: string;
}

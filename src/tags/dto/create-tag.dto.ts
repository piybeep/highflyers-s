import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({ description: 'Имя тега', example: 'Полезное' })
    @IsNotEmpty({ message: 'Имя тега не может быть пустым' })
    @IsString({ message: 'Имя тега должен быть строкой' })
    name: string;
}

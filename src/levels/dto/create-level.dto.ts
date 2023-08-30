import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
    @ApiProperty({
        description: 'Отображаемое имя уровня',
        example: 'C2',
    })
    @IsString({
        message: 'Имя уровня должно быть строкой',
    })
    @IsNotEmpty({
        message: 'Имя уровня не может быть пустым',
    })
    name: string;
}

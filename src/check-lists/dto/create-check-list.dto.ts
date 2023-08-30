import { ApiProperty } from '@nestjs/swagger';
import { CreateLearningResourceDto } from '@src/learning-resources/dto/create-learning-resource.dto';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckListDto {
    @ApiProperty({
        description: 'Тематика чек-листа',
        example: 'Времена',
    })
    @IsString({ message: 'Тематика должна быть строкой' })
    @IsNotEmpty({ message: 'Тематика не может быть пустой' })
    theme: string;

    @ApiProperty({
        type: () => CreateLearningResourceDto,
        isArray: true,
        description: 'Обучающие ресурсы',
    })
    @IsArray({ each: true, message: 'Ресурсы должны быть массивом' })
    resources: CreateLearningResourceDto[];
}

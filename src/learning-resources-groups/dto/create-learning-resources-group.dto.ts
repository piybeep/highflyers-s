import { ApiProperty } from '@nestjs/swagger';
import { CreateLearningResourceDto } from '@src/learning-resources/dto/create-learning-resource.dto';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateLearningResourcesGroupDto {
    @ApiProperty({
        description: 'Название группы обучающих ресурсов',
        example: 'Времена',
    })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    name: string;
    @ApiProperty({
        type: () => CreateLearningResourceDto,
        isArray: true,
        description: 'Обучающие ресурсы',
    })
    @IsArray({ each: true, message: 'Ресурсы должны быть массивом' })
    list: CreateLearningResourceDto[];
}

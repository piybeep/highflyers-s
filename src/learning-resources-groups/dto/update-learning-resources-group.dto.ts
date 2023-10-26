import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateLearningResourceDto } from '@src/learning-resources/dto/create-learning-resource.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLearningResourcesGroupDto {
    @ApiPropertyOptional({
        description: 'Название группы обучающих ресурсов',
        example: 'Времена',
    })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    @IsOptional()
    name?: string;
    @ApiPropertyOptional({
        type: () => CreateLearningResourceDto,
        isArray: true,
        description: 'Обучающие ресурсы',
    })
    @IsArray({ each: true, message: 'Ресурсы должны быть массивом' })
    @IsOptional()
    list?: CreateLearningResourceDto[];
}

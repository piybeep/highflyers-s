import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateLearningResourceDto } from '@src/learning-resources/dto/create-learning-resource.dto';
import { UpdateLearningResourceDto } from '@src/learning-resources/dto/update-learning-resource.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCheckListDto {
    @ApiPropertyOptional({
        description: 'Тематика чек-листа',
        example: 'Времена',
    })
    @IsOptional()
    @IsString({ message: 'Тематика должна быть строкой' })
    @IsNotEmpty({ message: 'Тематика не может быть пустой' })
    theme?: string;

    @ApiPropertyOptional({
        type: () => CreateLearningResourceDto,
        isArray: true,
        description: 'Обучающие ресурсы',
    })
    @IsOptional()
    @IsArray({ each: true, message: 'Ресурсы должны быть массивом' })
    resources?: UpdateLearningResourceDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateLearningResourcesGroupDto } from '@src/learning-resources-groups/dto/create-learning-resources-group.dto';
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
        type: () => CreateLearningResourcesGroupDto,
        isArray: true,
        description: 'Группы обучающих ресурсов',
    })
    @IsArray({
        each: true,
        message: 'Группы обучающих ресурсов должны быть массивом',
    })
    resources: CreateLearningResourcesGroupDto[];
}

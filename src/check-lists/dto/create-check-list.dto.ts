import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLearningResourceDto } from '@src/learning-resources/dto/create-learning-resource.dto';

export class CreateCheckListDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    theme: string;

    @ApiProperty()
    @IsArray({ each: true })
    resources: CreateLearningResourceDto[];
}

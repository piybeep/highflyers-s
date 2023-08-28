import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateLearningResourceDto } from '@src/learning-resources/dto/update-learning-resource.dto';

export class UpdateCheckListDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    theme?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray({ each: true })
    resources?: UpdateLearningResourceDto[];
}

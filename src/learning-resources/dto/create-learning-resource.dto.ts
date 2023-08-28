import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLearningResourceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    author: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    link: string;
}

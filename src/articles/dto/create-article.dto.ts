import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    topic: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    tags: string[];
}

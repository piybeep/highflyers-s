import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTestContentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsUUID('all', { each: true })
    answers: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { ExamsSubType, ExamsType } from '@src/exams/entities/exam.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: ExamsType;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subtype: ExamsSubType;
}

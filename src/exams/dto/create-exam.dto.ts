import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    type: string;
    exam: string;
    content: string[];
}

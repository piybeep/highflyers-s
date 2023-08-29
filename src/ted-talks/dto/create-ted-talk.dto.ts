import { IsArray, IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateTedTalkDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    theme: string;

    @IsString()
    @IsNotEmpty()
    read_time: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    link: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    preview: string;

    @IsArray()
    @IsUUID('4', { each: true })
    tags: string[];
}

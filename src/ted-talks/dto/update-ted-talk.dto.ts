import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class UpdateTedTalkDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    theme?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    read_time?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    link?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    preview?: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    tags?: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export abstract class GoogleDto {
    google_id: string;
    email: string;
    first_name: string;
    second_name: string;
}

export abstract class GoogleSignDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;
}

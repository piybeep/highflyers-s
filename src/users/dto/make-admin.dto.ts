import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MakeAdminDto {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    reverse?: boolean;
}

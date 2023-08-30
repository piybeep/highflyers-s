import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetAllDto {
    @ApiPropertyOptional({ type: 'number', minimum: 0, default: 0 })
    @IsOptional()
    @IsNumberString(
        {},
        { message: 'Номер страницы должен быть числовой строкой' },
    )
    page?: string;
}

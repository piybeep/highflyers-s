import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class CreateLessonPlanDto {
    @ApiProperty({
        description: 'Название плана уроков',
        example: 'Глагол "быть" в будущем',
    })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    name: string;

    @ApiProperty({
        description: 'Время изучения',
        example: '40 минут',
    })
    @IsString({ message: 'Время изучения должно быть строкой' })
    @IsNotEmpty({ message: 'Время изучения не может быть пустым' })
    read_time: string;

    @ApiPropertyOptional({
        description: 'Является ли план уроков бесплатным',
        example: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Поле isFree может быть только true или false' })
    isFree?: boolean;

    @ApiProperty({
        description: 'Ссылка на материал плана уроков',
        example: 'http://example.com/plan-1.pdf',
    })
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsNotEmpty({ message: 'Ссылка не может быть пустой' })
    @IsUrl({}, { message: 'Ссылка должна быть валидной' })
    link: string;

    @ApiProperty({
        description: 'Идентификатор уровня',
        example: 'b47ebf00-4f82-4a56-b00e-c2f4ed6b2a41',
    })
    @IsString({ message: 'Идентификатор уровня должен быть строкой' })
    @IsNotEmpty({ message: 'Идентификатор уровня не может быть пустым' })
    @IsUUID('4', { message: 'Идентификатор уровня должен быть формата UUIDv4' })
    level_id: string;
}

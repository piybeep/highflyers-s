import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Отсутствует имя услуги' })
  @IsString({ message: 'Имя услуги должно быть строкой' })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Отсутствует цена услуги' })
  @IsInt({ message: 'Цена должна быть целочисленным числом' })
  @IsPositive({ message: 'Цена должна быть больше 0' })
  defaultPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Отсутствует цена со скидкой услуги' })
  @IsInt({ message: 'Цена со скидкой должна быть целочисленным числом' })
  @IsPositive({ message: 'Цена должна быть больше 0' })
  discountPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Отсутствуют опции услуги' })
  @IsString({ each: true })
  points?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'Отсутствует идентификатор категории' })
  @IsUUID('4')
  categoryId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Отсутствует имя услуги' })
  @IsString({ message: 'Имя услуги должно быть строкой' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Отсутствует цена услуги' })
  @IsInt({ message: 'Цена должна быть целочисленным числом' })
  @IsPositive({ message: 'Цена должна быть больше 0' })
  defaultPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Отсутствует цена со скидкой услуги' })
  @IsInt({ message: 'Цена со скидкой должна быть целочисленным числом' })
  @IsPositive({ message: 'Цена должна быть больше 0' })
  discountPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Отсутствуют опции услуги' })
  @IsString({ each: true })
  points: string[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Отсутствует идентификатор категории' })
  @IsUUID('4')
  categoryId: string;
}

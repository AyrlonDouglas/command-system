import { ApiProperty } from '@nestjs/swagger';
import {
  isNumberString,
  IsString,
  IsCurrency,
  IsNumber,
} from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateItemDto {
  @ApiProperty({ example: 'rice', description: 'item name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'delicious white rice with white sauce with cheese',
    description: 'item description',
  })
  description: string;

  @ApiProperty({ example: 15.9, description: 'item price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'item category id' })
  @IsNumber()
  categoryId: number;
}

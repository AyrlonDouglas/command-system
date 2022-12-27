import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  EStatusOrderTypes,
  TStatusOrderTypes,
} from 'src/helper/enum/statusOrderTypes';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    enum: EStatusOrderTypes,
    example: EStatusOrderTypes.CONFIRMED,
    description: 'Order status',
  })
  @IsString()
  status: TStatusOrderTypes;
}

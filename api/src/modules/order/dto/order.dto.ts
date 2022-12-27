import {
  EStatusOrderTypes,
  TStatusOrderTypes,
} from 'src/helper/enum/statusOrderTypes';
import { Command } from 'src/modules/command/entities/command.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import { Order } from '../entities/order.entity';

export class OrderDto {
  readonly id: number;

  readonly amount: number;

  readonly status: TStatusOrderTypes;

  readonly command: Command;

  readonly canceled: boolean;

  readonly orderItems: OrderItem[];

  constructor(order: Order) {
    this.id = order.id;
    this.amount = order.amount;
    this.status = order.status;
    this.command = order.command;
    this.orderItems = order.orderItems;
    this.canceled = order.canceled;
  }
}

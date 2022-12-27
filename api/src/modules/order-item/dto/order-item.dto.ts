import { Item } from 'src/modules/item/entities/item.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

export class OrderItemDto {
  readonly id: number;

  readonly quantity: number;

  readonly order: Order;

  readonly item: Item;

  constructor(orderItem: OrderItem) {
    this.id = orderItem.id;
    this.quantity = orderItem.quantity;
    this.order = orderItem.order;
    this.item = orderItem.item;
  }
}

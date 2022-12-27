import { HttpException, HttpStatus } from '@nestjs/common';
import {
  EStatusOrderTypes,
  TStatusOrderTypes,
} from 'src/helper/enum/statusOrderTypes';
import { Command } from 'src/modules/command/entities/command.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { IItems } from '../dto/create-order.dto';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: EStatusOrderTypes.WAITING })
  status: TStatusOrderTypes;

  @ManyToOne(() => Command, (command) => command.orders)
  command: Command;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteddAt: Date;

  static async addItemToOrder(order: Order, item: IItems, employee: Employee) {
    const itemSearch = await Item.findOne({
      where: { id: item.id, company: { id: employee.company.id } },
    });

    if (!itemSearch) {
      throw new HttpException('Item não Cadastrado.', HttpStatus.BAD_GATEWAY);
    }

    const orderItem = new OrderItem();
    orderItem.item = itemSearch;
    orderItem.order = order;
    orderItem.quantity = item.quantity;

    await orderItem.save();

    order.amount = order.amount + itemSearch.price * item.quantity;
    await order.save();

    // const order = await Order.findOne({ where: { id: orderId } });

    // order.amount = order.amount + itemSearch.price * item.quantity;

    // await order.save();
  }
}

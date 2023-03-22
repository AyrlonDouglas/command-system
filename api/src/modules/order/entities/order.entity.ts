import { HttpException, HttpStatus } from '@nestjs/common';
import { OrderStatusEnum } from 'src/helper/enum/orders';
import { OrderStatusType } from 'src/helper/interfaces/orders';
// import { OrderStatusEnum, OrderStatusType } from '../../../helper/interfaces/orders';
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
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EntityManager,
} from 'typeorm';
import { IItems } from '../dto/create-order.dto';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0, type: 'float' })
  amount: number;

  @Column({
    default: OrderStatusEnum.WAITING,
    type: 'enum',
    enum: OrderStatusEnum,
  })
  status: OrderStatusType;

  @Column({ default: false })
  canceled: boolean;

  @ManyToOne(() => Command, (command) => command.orders)
  command: Command;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static async addItemToOrder(
    order: Order,
    item: IItems,
    employee: Employee,
    entityManager: EntityManager,
  ) {
    const itemSearch = await entityManager.findOne(Item, {
      where: { id: item.id, company: { id: employee.company.id } },
    });

    if (!itemSearch) {
      throw new HttpException('Item não Cadastrado.', HttpStatus.BAD_GATEWAY);
    }

    const orderItem = new OrderItem();
    orderItem.item = itemSearch;
    orderItem.order = order;
    orderItem.quantity = item.quantity;

    await entityManager.save(orderItem);

    order.amount = order.amount + itemSearch.price * item.quantity;
    await entityManager.save(order);
  }
}

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Order;
  }

  beforeUpdate(event: UpdateEvent<Order>): void | Promise<any> {
    let includeStatus = false;

    for (const status in OrderStatusEnum) {
      if (OrderStatusEnum[status] === event.entity.status) {
        includeStatus = true;
      }
    }

    if (!includeStatus && event.entity.status) {
      throw new HttpException(
        `Status fora do padrão de uso, utilize um desses: ${Object.values(OrderStatusEnum).map(
          (status) => ' ' + status,
        )}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

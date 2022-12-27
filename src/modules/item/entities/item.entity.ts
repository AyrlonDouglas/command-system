import { Category } from 'src/modules/category/entities/category.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { OrderItem } from 'src/modules/order-item/entities/order-item.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import {
  Entity,
  BaseEntity,
  EventSubscriber,
  EntitySubscriberInterface,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: true })
  avaliable: boolean;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @ManyToOne(() => Company, (company) => company.items)
  company: Company;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteddAt: Date;
}

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Item;
  }
}

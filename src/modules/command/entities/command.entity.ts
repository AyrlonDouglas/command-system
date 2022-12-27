import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Command extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.commands)
  employee: Employee;

  @Column({ type: 'bigint' })
  requesterCPF: number;

  @Column()
  requesterName: string;

  @Column({ nullable: true }) // FAZER RELAÇÃO
  tableId?: number;

  @OneToMany(() => Order, (order) => order.command) // FAZER RELAÇÃO
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteddAt: Date;
}

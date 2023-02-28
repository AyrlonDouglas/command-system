import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Table } from 'src/modules/table/entities/table.entity';
import { Command } from '../entities/command.entity';

export class CommandDto {
  readonly id: number;

  readonly table: Table;

  readonly employee: Employee;

  readonly orders: Order[];

  readonly requesterCPF: number;

  readonly requesterName: string;

  readonly totalCost: number;

  readonly isActive: boolean;

  constructor(command: Command) {
    this.id = command.id;
    this.employee = command.employee;
    this.orders = command.orders;
    this.requesterCPF = command.requesterCPF;
    this.requesterName = command.requesterName;
    this.isActive = command.isActive;
    this.table = command.table;
    this.totalCost = command?.orders?.reduce((prev, current) => prev + current.amount, 0) || 0;
    if (command.table) {
      this.table = command.table;
    }
  }
}

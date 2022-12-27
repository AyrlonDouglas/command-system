import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Command } from '../entities/command.entity';

export class CommandDto {
  readonly id: number;

  readonly tableId?: number;

  readonly employee: Employee;

  readonly orders: Order[];

  readonly requesterCpf: number;

  readonly requesterName: string;

  readonly totalCost: number;

  constructor(command: Command) {
    this.id = command.id;
    this.employee = command.employee;
    this.orders = command.orders;
    this.requesterCpf = command.requesterCPF;
    this.requesterName = command.requesterName;
    this.totalCost = command?.orders?.reduce(
      (prev, current) => prev + current.amount,
      0,
    );
    if (command.tableId) {
      this.tableId = command.tableId;
    }
  }
}

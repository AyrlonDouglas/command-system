import { Employee } from 'src/modules/employee/entities/employee.entity';

export class AuthPayloadDto {
  readonly id: number;

  readonly employeeCode: string;

  readonly token: string;

  constructor(employee: Employee, token: string) {
    this.id = employee.id;
    this.employeeCode = employee.employeeCode;
    this.token = token;
  }
}

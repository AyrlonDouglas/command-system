import { EmployeeDto } from 'src/modules/employee/dto/employee.dto';

export class AuthPayloadDto {
  readonly id: number;

  readonly employeeCode: string;

  readonly token: string;

  constructor(employee: EmployeeDto, token: string) {
    this.id = employee.id;
    this.employeeCode = employee.employeeCode;
    this.token = token;
  }
}

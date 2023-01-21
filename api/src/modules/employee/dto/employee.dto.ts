import { Company } from 'src/modules/company/entities/company.entity';
import { Employee } from '../entities/employee.entity';

export class EmployeeDto {
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly employeeCode: string;

  readonly email: string;

  // readonly password: string;

  readonly type: string;

  readonly isActive: boolean;

  readonly company: Company;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.employeeCode = employee.employeeCode;
    this.email = employee.email;
    // this.password = employee.password;
    this.type = employee.type;
    this.isActive = employee.isActive;
    this.company = employee.company;
  }
}

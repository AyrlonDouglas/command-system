import { Company } from 'src/modules/company/entities/company.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Employee } from '../entities/employee.entity';

export class EmployeeDto {
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly employeeCode: string;

  readonly email: string;

  readonly isActive: boolean;

  readonly company: Company;

  readonly role: Role;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.employeeCode = employee.employeeCode;
    this.email = employee.email;
    this.isActive = employee.isActive;
    this.company = employee.company;
    this.role = employee.role;
  }
}

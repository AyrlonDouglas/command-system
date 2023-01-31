import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { EmployeeRole } from '../entities/employee-role.entity';

export class EmployeeRoleDto {
  readonly id: number;

  readonly role: Role;

  readonly employee: Employee;

  constructor(employeeRole: EmployeeRole) {
    this.id = employeeRole.id;
    // this.employee = employeeRole.employee
    // this.role = employeeRole.role
  }
}

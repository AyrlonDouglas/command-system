import { Company } from '../../company/entities/company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  EventSubscriber,
  EntitySubscriberInterface,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity()
export class EmployeeRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.employeeRoles)
  employee: Employee;

  @ManyToOne(() => Role, (role) => role.employeeRoles)
  role: Employee;

  //   @Column()
  //   employee: Employee;

  //   @Column()
  //   role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@EventSubscriber()
export class EmployeeSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return EmployeeRole;
  }
}

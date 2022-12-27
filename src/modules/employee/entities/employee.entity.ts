import { Company } from '../../company/entities/company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { EEmployeeTypes, TEmployeeTypes } from 'src/helper/enum/employeeTypes';
import { Command } from 'src/modules/command/entities/command.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  employeeCode: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: EEmployeeTypes })
  type: TEmployeeTypes;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Company, (company) => company.employees)
  company: Company;

  @OneToMany(() => Command, (command) => command.employee)
  commands: Command[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteddAt: Date;
}

@EventSubscriber()
export class EmployeeSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Employee;
  }

  async beforeInsert(event: InsertEvent<Employee>): Promise<any> {
    const registeredEmployees = event.entity.company.registeredEmployees + 1;

    event.manager.update(
      Company,
      { id: event.entity.company.id },
      {
        registeredEmployees: registeredEmployees,
      },
    );

    event.entity.employeeCode = `${event.entity.company.prefix}${registeredEmployees}`;
  }
}

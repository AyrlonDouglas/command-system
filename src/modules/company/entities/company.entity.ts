import { Employee } from '../../employee/entities/employee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  prefix: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  cnpj: string;

  @Column({ default: 0 })
  registeredEmployees: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteddAt: Date;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}

@EventSubscriber()
export class CompanySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Company;
  }
  async beforeInsert(event: InsertEvent<Company>): Promise<any> {
    const company = await event.manager.findOne(Company, {
      where: { prefix: event.entity.prefix },
    });

    if (company) {
      throw new HttpException(
        'Já existe empresa com este prefixo.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
  async afterInsert(event: InsertEvent<Company>): Promise<any> {
    const pass = await bcrypt.hash('alterpassnow', await bcrypt.genSalt());

    await event.manager.insert(Employee, {
      company: event.entity,
      firstName: 'Admin',
      lastName: event.entity.prefix,
      password: pass,
      type: 'admin',
    });
  }
}

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
import { EEmployeeTypes } from '../../../helper/enum/employeeTypes';

import * as bcrypt from 'bcrypt';
import { Item } from 'src/modules/item/entities/item.entity';

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

  @OneToMany(() => Item, (item) => item.company)
  items: Item[];
}

@EventSubscriber()
export class CompanySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Company;
  }
  async beforeInsert(event: InsertEvent<Company>): Promise<any> {
    const companyWithSamePrefix = await event.manager.findOne(Company, {
      where: { prefix: event.entity.prefix },
    });

    if (companyWithSamePrefix) {
      throw new HttpException(
        'Já existe empresa com este prefixo cadastrada.',
        HttpStatus.CONFLICT,
      );
    }

    const companyWithSameCNPJ = await event.manager.findOne(Company, {
      where: { cnpj: event.entity.cnpj },
    });

    if (companyWithSameCNPJ) {
      throw new HttpException(
        'Já existe empresa com este CNPJ cadastrada.',
        HttpStatus.CONFLICT,
      );
    }

    const companyWithSameName = await event.manager.findOne(Company, {
      where: { name: event.entity.name },
    });

    if (companyWithSameName) {
      throw new HttpException(
        'Já existe empresa com este nome cadastrada.',
        HttpStatus.CONFLICT,
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
      type: EEmployeeTypes.ADMIN,
    });

    await event.manager.insert(Employee, {
      company: event.entity,
      firstName: 'Bot',
      lastName: event.entity.prefix,
      password: pass,
      type: EEmployeeTypes.BOT,
    });
  }
}

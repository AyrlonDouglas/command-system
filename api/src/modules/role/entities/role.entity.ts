import { EmployeeRole } from 'src/modules/employee-role/entities/employee-role.entity';
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => EmployeeRole, (employeeRole) => employeeRole.role)
  employeeRoles: EmployeeRole[];

  @OneToMany(() => RolePermission, (RolePermission) => RolePermission.role)
  rolePermissions: RolePermission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

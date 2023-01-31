import { Permission } from '../entities/permission.entity';

export class PermissionDto {
  readonly id: number;

  readonly name: string;

  constructor(permission: Permission) {
    this.id = permission.id;
    this.name = permission.name;
  }
}

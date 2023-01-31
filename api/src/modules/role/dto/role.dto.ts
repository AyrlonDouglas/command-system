import { Role } from '../entities/role.entity';

export class RoleDto {
  readonly id: number;

  readonly name: string;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
  }
}

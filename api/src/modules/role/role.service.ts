import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Company } from '../company/entities/company.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Permission } from '../permission/entities/permission.entity';
import { RolePermission } from '../role-permission/entities/role-permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  async create(createRoleDto: CreateRoleDto, employeeLogged: Employee) {
    const company = await Company.findOne({
      where: { id: employeeLogged.company.id },
    });

    if (!company)
      throw new HttpException('Não existe esta companhia', HttpStatus.PRECONDITION_FAILED);

    const role = new Role();
    role.name = createRoleDto.name;
    role.company = company;

    const roleData = await role.save();

    const permissions = await Promise.all(
      createRoleDto.permissionsIds.map((permissionId) =>
        Permission.findOne({ where: { id: permissionId } }),
      ),
    );

    await Promise.all(
      permissions.map((permition) => {
        const rolePermition = new RolePermission();
        rolePermition.permission = permition;
        rolePermition.role = roleData;
        return rolePermition.save();
      }),
    );

    const roleWithPermissions = await Role.findOne({
      where: { id: roleData.id },
      relations: { rolePermissions: { permission: true } },
    });

    return new RoleDto(roleWithPermissions);
  }

  async findAll(employeeLoged: Employee) {
    const roles = await Role.find({
      where: { company: { id: employeeLoged.company.id } },
      relations: { rolePermissions: { permission: true } },
    });
    return roles.map((role) => new RoleDto(role));
  }

  async findOne(id: number, employeeLogged: Employee) {
    const role = await Role.findOne({
      where: { id, company: { id: employeeLogged.company.id } },
      relations: { rolePermissions: { permission: true } },
    });

    if (!role) {
      throw new HttpException('Não existe função com o id ' + id, HttpStatus.BAD_REQUEST);
    }

    return new RoleDto(role);
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}

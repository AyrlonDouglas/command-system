import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Company } from '../company/entities/company.entity';
import { Employee } from '../employee/entities/employee.entity';
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
    return new RoleDto(roleData);
  }

  async findAll(employeeLoged: Employee) {
    const roles = await Role.find({ where: { company: { id: employeeLoged.company.id } } });
    return roles.map((role) => new RoleDto(role));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}

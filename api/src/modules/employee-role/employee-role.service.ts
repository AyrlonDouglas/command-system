import { Injectable } from '@nestjs/common';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';

@Injectable()
export class EmployeeRoleService {
  create(createEmployeeRoleDto: CreateEmployeeRoleDto) {
    return 'This action adds a new employeeRole';
  }

  // findAll() {
  //   return `This action returns all employeeRole`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} employeeRole`;
  // }

  // update(id: number, updateEmployeeRoleDto: UpdateEmployeeRoleDto) {
  //   return `This action updates a #${id} employeeRole`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employeeRole`;
  // }
}

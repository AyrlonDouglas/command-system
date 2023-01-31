import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';

@Controller('employee-role')
export class EmployeeRoleController {
  constructor(private readonly employeeRoleService: EmployeeRoleService) {}

  @Post()
  create(@Body() createEmployeeRoleDto: CreateEmployeeRoleDto) {
    return this.employeeRoleService.create(createEmployeeRoleDto);
  }

  // @Get()
  // findAll() {
  //   return this.employeeRoleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeeRoleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmployeeRoleDto: UpdateEmployeeRoleDto) {
  //   return this.employeeRoleService.update(+id, updateEmployeeRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeRoleService.remove(+id);
  // }
}

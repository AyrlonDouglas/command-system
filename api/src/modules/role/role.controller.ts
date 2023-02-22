import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';
import { Employee } from '../employee/entities/employee.entity';
@ApiBearerAuth()
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @EmployeeLogged() employeeLogged: Employee) {
    return this.roleService.create(createRoleDto, employeeLogged);
  }

  @Get()
  findAll(@EmployeeLogged() employeeLogged: Employee) {
    return this.roleService.findAll(employeeLogged);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @EmployeeLogged() employeeLogged: Employee) {
    return this.roleService.findOne(+id, employeeLogged);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}

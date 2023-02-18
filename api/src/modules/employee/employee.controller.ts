import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';
import { Permissions } from 'src/helper/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto, @EmployeeLogged() employeeLogged: Employee) {
    return this.employeeService.create(createEmployeeDto, employeeLogged);
  }

  @Permissions([{ entity: 'EMPLOYEE', action: 'VIEW' }])
  @Get()
  findAll(@EmployeeLogged() employeeLogged: Employee) {
    return this.employeeService.findAll(employeeLogged);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @EmployeeLogged() employeeLogged: Employee) {
    console.log('id', id);
    return this.employeeService.findOne(+id, employeeLogged);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @EmployeeLogged() employeeLogged: Employee,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto, employeeLogged);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}

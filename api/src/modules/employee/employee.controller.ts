import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Body('employeeLogged') employeeLogged: Employee) {
    return this.employeeService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}

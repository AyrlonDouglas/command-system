import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../employee/entities/employee.entity';
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';

@ApiBearerAuth()
@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(
    @Body() createTableDto: CreateTableDto,
    @EmployeeLogged() employeeLogged: Employee,
  ) {
    return this.tableService.create(createTableDto, employeeLogged);
  }

  @Get()
  findAll(@EmployeeLogged() employeeLogged: Employee) {
    return this.tableService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tableService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
  //   return this.tableService.update(+id, updateTableDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tableService.remove(+id);
  // }
}

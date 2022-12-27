import { Injectable } from '@nestjs/common';
import { Company } from '../company/entities/company.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { TableDto } from './dto/table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  async create(createTableDto: CreateTableDto, employeeLogged: Employee) {
    const table = new Table();
    table.name = createTableDto.name;
    table.company = employeeLogged.company;

    const tableData = await table.save();

    return new TableDto(tableData);
  }

  async findAll(employeeLogged: Employee) {
    const tables = await Table.find({
      where: { company: { id: employeeLogged.company.id } },
    });

    return tables.map((table) => new TableDto(table));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} table`;
  // }

  // update(id: number, updateTableDto: UpdateTableDto) {
  //   return `This action updates a #${id} table`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} table`;
  // }
}

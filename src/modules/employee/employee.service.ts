import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entities/employee.entity';
import * as bcrypt from 'bcrypt';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class EmployeeService {
  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDto> {
    const company = await Company.findOneBy({
      id: createEmployeeDto.companyId,
    });

    if (!company) {
      throw new HttpException(
        'Companhia não existe no sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const employee = new Employee();
    employee.email = createEmployeeDto.email;
    employee.firstName = createEmployeeDto.firstName;
    employee.lastName = createEmployeeDto.lastName;
    employee.password = await bcrypt.hash(
      createEmployeeDto.password,
      await bcrypt.genSalt(),
    );
    employee.company = company;

    const employeeData = await employee.save();

    return new EmployeeDto(employeeData);
  }

  async findAll(employeeLoged: Employee): Promise<EmployeeDto[]> {
    const employees = await Employee.find({
      where: {
        company: { id: employeeLoged.company.id },
      },
    });

    return employees.map((employee) => new EmployeeDto(employee));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} employee`;
  // }

  // update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  //   return `This action updates a #${id} employee`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employee`;
  // }
}

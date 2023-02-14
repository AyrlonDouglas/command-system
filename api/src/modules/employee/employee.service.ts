import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeDto } from './dto/employee.dto';
import { Employee } from './entities/employee.entity';
import * as bcrypt from 'bcrypt';
import { Company } from '../company/entities/company.entity';
import { EmployeeLogged } from 'src/helper/types/employeeLogged';
import { EEmployeeTypes } from 'src/helper/enum/employeeTypes';

@Injectable()
export class EmployeeService {
  async create(
    createEmployeeDto: CreateEmployeeDto,
    employeeLogged: Employee,
  ): Promise<EmployeeDto> {
    const company = await Company.findOneBy({
      id: employeeLogged.company.id,
    });

    const employee = new Employee();
    employee.email = createEmployeeDto.email;
    employee.firstName = createEmployeeDto.firstName;
    employee.lastName = createEmployeeDto.lastName;

    if (createEmployeeDto.password) {
      employee.password = await bcrypt.hash(
        createEmployeeDto.password,
        await bcrypt.genSalt(),
      );
    }

    employee.company = company;

    const employeeData = await employee.save();

    return new EmployeeDto(employeeData);
  }

  async findAll(employeeLoged: Employee): Promise<EmployeeDto[]> {
    const employees = await Employee.find({
      where: {
        company: { id: employeeLoged.company.id },
      },
      relations: { role: true },
    });

    console.log('employees', employees);

    return employees.map((employee) => new EmployeeDto(employee));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} employee`;
  // }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
    employeeLogged: Employee,
  ): Promise<EmployeeDto> {
    // if (
    //   employeeLogged.id !== id &&
    //   employeeLogged.type !== EEmployeeTypes.ADMIN
    // ) {
    //   throw new HttpException(
    //     'Você não tem permissão para atualizar colaboradores além de si.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    await Employee.update({ id }, updateEmployeeDto);

    const employeeData = await Employee.findOneBy({ id });

    return new EmployeeDto(employeeData);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} employee`;
  // }
}

import { createParamDecorator } from '@nestjs/common';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { EmployeeLogged } from '../types/employeeLogged';

const EmployeeLogged = createParamDecorator((data, req) => {
  return req.args[0].employeeLogged as Employee;
});

export default EmployeeLogged;

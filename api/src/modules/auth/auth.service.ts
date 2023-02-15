import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from '../employee/dto/employee.dto';
import { AuthPayloadDto } from './dto/auth-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async login(auth: AuthLoginDto): Promise<AuthPayloadDto> {
    const employee = await this.validateEmployee(auth.employeeCode, auth.password);

    const token = await this.generateToken({
      id: employee.id,
      companyId: employee.company.id,
      role: employee.role.id,
      employeeCode: employee.employeeCode,
    });

    return new AuthPayloadDto(employee, token);
  }

  async validateEmployee(employeeCode: string, pass: string): Promise<Employee> {
    const employee = await Employee.findOne({
      where: { employeeCode },
      relations: {
        company: true,
        role: true,
      },
    });

    if (employee && employee.isActive && (await this.comparePassword(pass, employee.password))) {
      delete employee.password;
      return employee;
    }

    if (employee && !employee.isActive) {
      throw new HttpException(
        'Sua conta está inativada, consulte administração para saber mais',
        HttpStatus.UNAUTHORIZED,
      );
    }

    throw new HttpException('Código e/ou senha errada.', HttpStatus.UNAUTHORIZED);
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(body: any) {
    const token = await this.jwtService.signAsync(body, {
      secret: process.env.JWTKEY,
    });

    return token;
  }
}

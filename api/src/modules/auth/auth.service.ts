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

  async validateEmployee(employeeCode: string, pass: string): Promise<any> {
    const employee = await Employee.findOne({
      where: { employeeCode },
      relations: {
        company: true,
      },
    });

    if (
      employee &&
      employee.isActive &&
      (await this.comparePassword(pass, employee.password))
    ) {
      delete employee.password;
      return employee;
    }

    if (!employee.isActive) {
      throw new HttpException(
        'Sua conta foi inativada, consulte administração para saber mais',
        HttpStatus.UNAUTHORIZED,
      );
    }

    throw new HttpException(
      'Código e/ou senha errada.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async login(auth: AuthLoginDto): Promise<AuthPayloadDto> {
    const employee: EmployeeDto = await this.validateEmployee(
      auth.employeeCode,
      auth.password,
    );

    const token = await this.generateToken({
      companyId: employee.company.id,
      type: employee.type,
      id: employee.id,
      employeeCode: employee.employeeCode,
    });

    return new AuthPayloadDto(employee, token);
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

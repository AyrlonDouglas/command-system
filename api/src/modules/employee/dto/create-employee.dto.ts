import { IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EEmployeeTypes, TEmployeeTypes } from 'src/helper/enum/employeeTypes';

export class CreateEmployeeDto {
  @ApiProperty({ description: "Employee's first name", example: 'Rodolfo' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: "Employee's last name", example: 'Silveira' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Employee's e-mail ",
    example: 'teste@teste.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Employee's Password",
    example: 'alterarsenhaagora',
    required: false,
  })
  password: string;

  @ApiProperty({
    description: "Employee's type",
    example: EEmployeeTypes.STANDARD,
  })
  @IsString()
  type: TEmployeeTypes;
}

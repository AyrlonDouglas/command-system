import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateEmployeeRoleDto {
  @ApiProperty({ example: 1, description: 'Employee id' })
  @IsNumber()
  employeId: number;

  @ApiProperty({ example: 1, description: 'role id' })
  @IsNumber()
  roleId: number;
}

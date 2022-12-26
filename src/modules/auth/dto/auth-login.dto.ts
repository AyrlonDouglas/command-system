import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ description: "Employee's code", example: 'FG1' })
  @IsString()
  employeeCode: string;

  @ApiProperty({ description: "Employee's pass", example: 'alterpassnow' })
  @IsString()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Garçom', description: "role's name" })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: "role's companyId" })
  @IsNumber()
  companyId: number;
}

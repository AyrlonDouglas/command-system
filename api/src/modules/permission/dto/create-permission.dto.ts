import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'category.view', description: 'name permission' })
  @IsString()
  name: string;
}

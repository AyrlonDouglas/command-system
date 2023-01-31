import { Module } from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRoleController } from './employee-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRole } from './entities/employee-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRole])],
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService],
})
export class EmployeeRoleModule {}

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// config
import { databaseConfig } from './config/database.config';
// middleware
import { AuthMiddleware } from './middlewares/auth.middleware';
// controller
import { AuthController } from './modules/auth/auth.controller';
// provides
import { JwtService } from '@nestjs/jwt';
// modules
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ItemModule } from './modules/item/item.module';
import { OrderModule } from './modules/order/order.module';
import { CommandModule } from './modules/command/command.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { TableModule } from './modules/table/table.module';
import { RoleModule } from './modules/role/role.module';
import { EmployeeRoleModule } from './modules/employee-role/employee-role.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    CompanyModule,
    EmployeeModule,
    AuthModule,
    CategoryModule,
    ItemModule,
    OrderModule,
    CommandModule,
    OrderItemModule,
    TableModule,
    RoleModule,
    EmployeeRoleModule,
    RolePermissionModule,
    PermissionModule,
  ],
  controllers: [AuthController],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/company', method: RequestMethod.POST },
        { path: '/company', method: RequestMethod.GET },
      )
      .forRoutes('');
  }
}

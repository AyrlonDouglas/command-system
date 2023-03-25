import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../employee/entities/employee.entity';
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';
import EntityManagerParam from 'src/helper/decorators/entityManager.decorator';
import { EntityManager } from 'typeorm';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.orderService.create(createOrderDto, employeeLogged, entityManager);
  }

  @Get()
  findAll(
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.orderService.findAll(employeeLogged, entityManager);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.orderService.update(+id, updateOrderDto, employeeLogged, entityManager);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}

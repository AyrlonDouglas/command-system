import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../employee/entities/employee.entity';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Body('employeeLogged') employeeLogged: Employee,
  ) {
    return this.orderService.create(createOrderDto, employeeLogged);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Body('employeeLogged') employeeLogged: Employee) {
    return this.orderService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Body('employeeLogged') employeeLogged: Employee,
  ) {
    return this.orderService.update(+id, updateOrderDto, employeeLogged);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}

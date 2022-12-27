import { Injectable } from '@nestjs/common';
import { Employee } from '../employee/entities/employee.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  create(createOrderItemDto: CreateOrderItemDto) {
    return 'This action adds a new orderItem';
  }

  async findAll(employeeLogged: Employee) {
    const orderItems = await OrderItem.find({
      where: { item: { company: { id: employeeLogged.company.id } } },
    });
    return orderItems.map((orderItem) => new OrderItemDto(orderItem));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} orderItem`;
  // }

  // update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
  //   return `This action updates a #${id} orderItem`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orderItem`;
  // }
}

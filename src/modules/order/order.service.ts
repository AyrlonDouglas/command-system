import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Command } from '../command/entities/command.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  async create(
    createOrderDto: CreateOrderDto,
    employeeLogged: Employee,
  ): Promise<OrderDto> {
    if (createOrderDto.Items.length === 0) {
      throw new HttpException(
        'Para cadastrar um pedido você deve adicionar pelo menos um item',
        HttpStatus.BAD_REQUEST,
      );
    }

    const command = await Command.findOne({
      where: { id: createOrderDto.commandId },
    });

    if (!command) {
      throw new HttpException('Comanda não existe', HttpStatus.BAD_REQUEST);
    }
    const order = new Order();

    order.command = command;

    const orderData = await order.save();

    for (const item of createOrderDto.Items) {
      await Order.addItemToOrder(orderData, item, employeeLogged);
    }

    const orderDataUpdated = await Order.findOne({
      where: { id: orderData.id },
    });

    return new OrderDto(orderDataUpdated);
  }

  async findAll(employeeLogged: Employee) {
    const orders = await Order.find({
      where: {
        command: { employee: { company: { id: employeeLogged.company.id } } },
      },
    });
    return orders.map((order) => new OrderDto(order));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
    employeeLogged: Employee,
  ) {
    const order = await Order.findOne({
      where: {
        id,
        command: { employee: { company: { id: employeeLogged.company.id } } },
      },
    });

    if (!order) {
      throw new HttpException(
        'Este pedido não existe.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }

    const orderData = await order.save();

    return new OrderDto(orderData);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}

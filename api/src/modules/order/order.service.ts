import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from 'typeorm';
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
    entityManager: EntityManager,
  ): Promise<OrderDto> {
    if (createOrderDto.items.length === 0) {
      throw new HttpException(
        'Para cadastrar um pedido você deve adicionar pelo menos um item',
        HttpStatus.BAD_REQUEST,
      );
    }

    const command = await entityManager.findOne(Command, {
      where: { id: createOrderDto.commandId },
    });

    if (!command) {
      throw new HttpException('Comanda não existe', HttpStatus.BAD_REQUEST);
    }

    const order = new Order();
    order.command = command;

    const orderData = await entityManager.save(order);

    for (const item of createOrderDto.items) {
      await Order.addItemToOrder(orderData, item, employeeLogged, entityManager);
    }

    const orderDataUpdated = await entityManager.findOne(Order, {
      where: { id: orderData.id },
      relations: { command: { table: true }, orderItems: { item: true } },
    });

    return new OrderDto(orderDataUpdated);
  }

  async findAll(employeeLogged: Employee, entityManager: EntityManager) {
    const orders = await entityManager.find(Order, {
      where: {
        command: { employee: { company: { id: employeeLogged.company.id } } },
      },
      relations: { command: { table: true }, orderItems: { item: true } },
    });
    return orders.map((order) => new OrderDto(order));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  async update(id: number, updateOrderDto: UpdateOrderDto, employeeLogged: Employee) {
    const order = await Order.findOne({
      where: {
        id,
        command: { employee: { company: { id: employeeLogged.company.id } } },
      },
    });

    if (!order) {
      throw new HttpException('Este pedido não existe.', HttpStatus.BAD_REQUEST);
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

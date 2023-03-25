import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Command } from '../command/entities/command.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Item } from '../item/entities/item.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
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

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
    employeeLogged: Employee,
    entityManager: EntityManager,
  ) {
    // FIXME: FUNÇÃO NÃO FUNCIONA ADEQUADAMENTE, SÓ ATUALIZA O STATUS
    const order = await entityManager.findOne(Order, {
      where: {
        id,
        command: { employee: { company: { id: employeeLogged.company.id } } },
      },
      relations: { command: { table: true }, orderItems: { item: true } },
    });

    if (!order) {
      throw new HttpException('Este pedido não existe.', HttpStatus.BAD_REQUEST);
    }

    const itemsToAdd = updateOrderDto.items.filter(
      (item) => !order.orderItems.some((orderItem) => orderItem.item.id === item.id),
    );
    const orderItemsToAddPromise: Promise<OrderItem>[] = [];

    for (const item of itemsToAdd) {
      const itemData = await entityManager.findOne(Item, { where: { id: item.id } });
      const orderItem = entityManager
        .create(OrderItem, {
          item: itemData,
          order: order,
          quantity: item.quantity,
        })
        .save();

      orderItemsToAddPromise.push(orderItem);
    }

    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }

    const orderItemsToRemove = order.orderItems.filter(
      (orderItem) => !updateOrderDto.items.some((item) => item.id === orderItem.item.id),
    );

    const orderItemsToModifyQuantity = order.orderItems
      .filter(
        (orderItem) =>
          !orderItemsToRemove.some(
            (orderItemRemove) => orderItemRemove.item.id === orderItem.item.id,
          ),
      )
      .filter(
        (orderItem) =>
          updateOrderDto.items.find((item) => item.id === orderItem.item.id).quantity !==
          orderItem.quantity,
      )
      .map((orderItem) => {
        orderItem.quantity = updateOrderDto.items.find(
          (item) => item.id === orderItem.item.id,
        ).quantity;

        return orderItem;
      });

    await Promise.all([
      Promise.all(orderItemsToAddPromise),
      entityManager.remove(orderItemsToRemove),
      entityManager.save(orderItemsToModifyQuantity),
    ]);

    const orderData = await entityManager.save(order);
    return new OrderDto(orderData);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}

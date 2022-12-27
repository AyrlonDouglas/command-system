import { Injectable } from '@nestjs/common';
import { Employee } from '../employee/entities/employee.entity';
import { Order } from '../order/entities/order.entity';
import { CommandDto } from './dto/command.dto';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entities/command.entity';

@Injectable()
export class CommandService {
  async create(
    createCommandDto: CreateCommandDto,
    employeeLogged: Employee,
  ): Promise<CommandDto> {
    const command = new Command();

    command.requesterCPF = createCommandDto.requesterCPF;
    command.requesterName = createCommandDto.requesterName;
    command.employee = employeeLogged;

    if (createCommandDto.tableId) {
      command.tableId = createCommandDto.tableId;
    }

    const commandData = await command.save();

    return new CommandDto(commandData);
  }

  async findAll(employeeLogged: Employee): Promise<CommandDto[]> {
    const commands = await Command.find({
      where: { employee: { company: { id: employeeLogged.company.id } } },
      relations: { orders: { orderItems: true } },
    });

    return commands.map((command) => new CommandDto(command));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} command`;
  // }

  // update(id: number, updateCommandDto: UpdateCommandDto) {
  //   return `This action updates a #${id} command`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} command`;
  // }
}

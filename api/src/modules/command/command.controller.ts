import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';
import { Employee } from '../employee/entities/employee.entity';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
@ApiBearerAuth()
@ApiTags('Command')
@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  create(
    @Body() createCommandDto: CreateCommandDto,
    @EmployeeLogged() employeeLogged: Employee,
  ) {
    return this.commandService.create(createCommandDto, employeeLogged);
  }

  @Get()
  findAll(@EmployeeLogged() employeeLogged: Employee) {
    return this.commandService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commandService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {
  //   return this.commandService.update(+id, updateCommandDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commandService.remove(+id);
  // }
}

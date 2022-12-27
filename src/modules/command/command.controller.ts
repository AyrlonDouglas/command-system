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
import { Employee } from '../employee/entities/employee.entity';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@ApiTags('Command')
@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createCommandDto: CreateCommandDto,
    @Body('employeeLogged') employeeLogged: Employee,
  ) {
    return this.commandService.create(createCommandDto, employeeLogged);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Body('employeeLogged') employeeLogged: Employee) {
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

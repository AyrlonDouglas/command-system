import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../employee/entities/employee.entity';
import { EmployeeLogged } from 'src/helper/types/employeeLogged';

@ApiBearerAuth()
@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    const createItemDtoData = createItemDto as CreateItemDto & EmployeeLogged;
    return this.itemService.create(createItemDtoData);
  }

  @Get()
  findAll(@Body('employeeLogged') employeeLogged: Employee) {
    return this.itemService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itemService.findOne(+id);
  // }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const updateItemDtoData = updateItemDto as UpdateItemDto & EmployeeLogged;
    return this.itemService.update(+id, updateItemDtoData);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemService.remove(+id);
  // }
}

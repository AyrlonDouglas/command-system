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

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Body() createItemDto: CreateItemDto,
    @Body('employeeLogged') employeeLogged: Employee,
  ) {
    return this.itemService.create(createItemDto, employeeLogged);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Body('employeeLogged') employeeLogged: Employee) {
    return this.itemService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itemService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemService.update(+id, updateItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemService.remove(+id);
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../employee/entities/employee.entity';
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';
import EntityManagerParam from 'src/helper/decorators/entityManager.decorator';
import { EntityManager } from 'typeorm';
import { Permissions } from 'src/helper/decorators/permission.decorator';

@ApiBearerAuth()
@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Permissions([{ entity: 'ITEM', action: 'CREATE' }])
  @Post()
  create(
    @Body() createItemDto: CreateItemDto,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.create(createItemDto, employeeLogged, entityManager);
  }

  @Permissions([{ entity: 'ITEM', action: 'VIEW' }])
  @Get()
  findAll(
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.findAll(employeeLogged, entityManager);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itemService.findOne(+id);
  // }

  @Permissions([{ entity: 'ITEM', action: 'EDIT' }])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.update(+id, updateItemDto, employeeLogged, entityManager);
  }

  @Permissions([{ entity: 'ITEM', action: 'REMOVE' }])
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.remove(+id, employeeLogged, entityManager);
  }
}

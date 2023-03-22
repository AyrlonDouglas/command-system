import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  async create(
    createItemDto: CreateItemDto,
    employeeLogged: Employee,
    entityManager: EntityManager,
  ) {
    const category = await entityManager.findOneBy(Category, { id: createItemDto.categoryId });

    if (!category) {
      throw new HttpException('Esta categoria não existe.', HttpStatus.BAD_GATEWAY);
    }

    const item = new Item();
    item.name = createItemDto.name;
    item.description = createItemDto.description;
    item.price = createItemDto.price;
    item.category = category;
    item.company = employeeLogged.company;
    item.avaliable = createItemDto.avaliable;

    const itemData = await entityManager.save(item);

    return new ItemDto(itemData);
  }

  async findAll(employeeLoged: Employee, entityManager: EntityManager) {
    const items = await entityManager.find(Item, {
      where: { company: { id: employeeLoged.company.id } },
      relations: { category: true },
      select: { category: { id: true, name: true } },
    });
    return items.map((item) => new ItemDto(item));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    employeeLoged: Employee,
    entityManager: EntityManager,
  ) {
    const item = await entityManager.findOne(Item, {
      where: { id, company: { id: employeeLoged.company.id } },
    });

    if (!item) {
      throw new HttpException('O item não existe', HttpStatus.PRECONDITION_FAILED);
    }

    if (updateItemDto.categoryId) {
      updateItemDto.category = await entityManager.findOneBy(Category, {
        id: updateItemDto.categoryId,
      });
      delete updateItemDto.categoryId;
    }

    await entityManager.update(Item, { id }, updateItemDto);

    const itemData = await entityManager.findOne(Item, {
      where: { id },
      relations: { category: true },
    });

    return new ItemDto(itemData);
  }

  async remove(id: number, employeeLoged: Employee, entityManager: EntityManager) {
    const item = await entityManager.findOne(Item, {
      where: { id, company: { id: employeeLoged.company.id } },
    });

    if (!item) {
      throw new HttpException('Item não existe', HttpStatus.PRECONDITION_FAILED);
    }

    return entityManager.remove(item);
  }
}

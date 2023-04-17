import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ItemService {
  async create(
    createItemDto: CreateItemDto,
    employeeLogged: Employee,
    entityManager: EntityManager,
    file: Express.Multer.File,
  ) {
    const category = await entityManager.findOneBy(Category, { id: createItemDto.categoryId });

    if (!category) {
      throw new HttpException('Esta categoria não existe.', HttpStatus.BAD_GATEWAY);
    }

    const item = new Item();
    item.name = createItemDto.name;
    item.description = createItemDto.description;
    item.price = +createItemDto.price;
    item.category = category;
    item.company = employeeLogged.company;
    item.avaliable = createItemDto.avaliable;
    item.imageName = file.filename;

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

  async findOne(id: number, employeeLoged: Employee, entityManager: EntityManager) {
    const item = entityManager.findOne(Item, {
      where: { id, company: { id: employeeLoged.company.id } },
    });

    return item;
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    employeeLoged: Employee,
    entityManager: EntityManager,
  ) {
    const item = await this.findOne(id, employeeLoged, entityManager);

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
    const item = await this.findOne(id, employeeLoged, entityManager);

    if (!item) {
      throw new HttpException('Item não existe', HttpStatus.PRECONDITION_FAILED);
    }

    return entityManager.remove(item);
  }

  async findItemPicture(id: number, employeeLoged: Employee, entityManager: EntityManager) {
    const item = await this.findOne(id, employeeLoged, entityManager);

    let buffer = null;
    let extension = null;

    if (item && item.imageName) {
      const pathImage = path.resolve(__dirname, '../../../public/images/items', item.imageName);

      buffer = await fs.readFile(pathImage).catch((err) => {
        throw new HttpException(
          'Algum erro aconteceu ao buscar a imagem do item',
          HttpStatus.INTERNAL_SERVER_ERROR,
          { description: err?.message },
        );
      });
      extension = path.extname(item.imageName);
    }

    return { buffer, extension };
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// entity
import { EntityManager } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Item } from './entities/item.entity';
// dto
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
// libs
import * as fs from 'fs/promises';
import * as path from 'path';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

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
    item.price = createItemDto.price;
    item.category = category;
    item.company = employeeLogged.company;
    item.avaliable = createItemDto.avaliable;

    if (file) {
      const fileSaved = await this.saveItemPicture(employeeLogged, file);
      item.imageName = fileSaved.fileName;
    }

    const itemData = await entityManager.save(item);

    // // const image = await this.findItemPicture(itemSaved.id, employeeLogged, entityManager);
    // //TODO ajustar para não utilizar any
    // const itemData = { ...itemSaved, image } as any;

    return new ItemDto(itemData);
  }

  async findAll(employeeLogged: Employee, entityManager: EntityManager) {
    const items = await entityManager.find(Item, {
      where: { company: { id: employeeLogged.company.id } },
      relations: { category: true },
      select: { category: { id: true, name: true } },
    });

    const itemsData = [];

    for (const item of items) {
      if (item.imageName) {
        const image = await this.findItemPicture(item.id, employeeLogged, entityManager);
        itemsData.push({ ...item, image });
      } else {
        itemsData.push(item);
      }
    }

    return itemsData.map((item) => new ItemDto(item));
  }

  async findOne(id: number, employeeLogged: Employee, entityManager: EntityManager) {
    const item = entityManager.findOne(Item, {
      where: { id, company: { id: employeeLogged.company.id } },
    });

    return item;
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    employeeLogged: Employee,
    entityManager: EntityManager,
  ) {
    const item = await this.findOne(id, employeeLogged, entityManager);

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

  async remove(id: number, employeeLogged: Employee, entityManager: EntityManager) {
    const item = await this.findOne(id, employeeLogged, entityManager);

    if (!item) {
      throw new HttpException('Item não existe', HttpStatus.PRECONDITION_FAILED);
    }

    return entityManager.remove(item);
  }

  async findItemPicture(id: number, employeeLogged: Employee, entityManager: EntityManager) {
    const item = await this.findOne(id, employeeLogged, entityManager);

    let buffer = null;

    if (item && item.imageName) {
      const pathImage = path.resolve(__dirname, '../../../public/images/items', item.imageName);

      buffer = await fs.readFile(pathImage).catch((err) => {
        throw new HttpException(
          'Algum erro aconteceu ao buscar a imagem do item',
          HttpStatus.INTERNAL_SERVER_ERROR,
          { description: err?.message },
        );
      });
    }

    return buffer;
  }

  async saveItemPicture(employeeLogged: Employee, file: Express.Multer.File) {
    const uniqueSuffix = uuidv4();

    const fileName = `${employeeLogged.company.prefix}-${uniqueSuffix}${extname(
      file.originalname,
    )}`;

    return await sharp(file.buffer)
      .resize(800) // Redimensionar para uma largura máxima de 800 pixels
      .jpeg({ quality: 80 }) // Comprimir como JPEG com qualidade de 80%
      .toFile(`public/images/items/${fileName}`)
      .then((res) => {
        return { res, fileName };
      });
  }
}

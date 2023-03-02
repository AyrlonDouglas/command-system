import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto, employeeLogged: Employee) {
    const category = await Category.findOneBy({ id: createItemDto.categoryId });

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

    const itemData = await item.save();

    return new ItemDto(itemData);
  }

  async findAll(employeeLoged: Employee) {
    const items = await Item.find({
      where: { company: { id: employeeLoged.company.id } },
      relations: { category: true },
      select: { category: { id: true, name: true } },
    });
    return items.map((item) => new ItemDto(item));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  async update(id: number, updateItemDto: UpdateItemDto, employeeLoged: Employee) {
    const item = await Item.findOne({ where: { id, company: { id: employeeLoged.company.id } } });

    if (!item) {
      throw new HttpException('O item não existe', HttpStatus.PRECONDITION_FAILED);
    }

    if (updateItemDto.categoryId) {
      updateItemDto.category = await Category.findOneBy({
        id: updateItemDto.categoryId,
      });
      delete updateItemDto.categoryId;
    }

    await Item.update({ id }, updateItemDto);

    const itemData = await Item.findOne({
      where: { id },
      relations: { category: true },
    });

    return new ItemDto(itemData);
  }

  async remove(id: number, employeeLoged: Employee) {
    const item = await Item.findOne({ where: { id, company: { id: employeeLoged.company.id } } });

    if (!item) {
      throw new HttpException('Item não existe', HttpStatus.PRECONDITION_FAILED);
    }

    return item.remove();
  }
}

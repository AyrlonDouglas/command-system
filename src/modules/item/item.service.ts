import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto, employeeLoged: Employee) {
    const category = await Category.findOneBy({ id: createItemDto.categoryId });

    if (!category) {
      throw new HttpException(
        'Esta categoria não existe.',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const item = new Item();
    item.name = createItemDto.name;
    item.description = createItemDto.description;
    item.price = createItemDto.price;
    item.category = category;
    item.company = employeeLoged.company;

    const itemData = await item.save();

    return new ItemDto(itemData);
  }

  async findAll(employeeLoged: Employee) {
    const items = await Item.find({
      where: { company: { id: employeeLoged.company.id } },
    });
    return items.map((item) => new ItemDto(item));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}

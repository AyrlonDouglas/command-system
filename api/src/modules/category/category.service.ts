import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeeLogged } from 'src/helper/types/employeeLogged';
import { Employee } from '../employee/entities/employee.entity';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async create(
    createCategoryDto: CreateCategoryDto & EmployeeLogged,
  ): Promise<CategoryDto> {
    const existingCategory = await Category.findOneBy({
      company: { id: createCategoryDto.employeeLogged.company.id },
      name: createCategoryDto.name,
    });

    if (existingCategory) {
      throw new HttpException(
        'Esta categoria já existe.',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const category = new Category();
    category.name = createCategoryDto.name;
    category.company = createCategoryDto.employeeLogged.company;

    const categoryData = await category.save();

    return new CategoryDto(categoryData);
  }

  async findAll(EmployeeLogged: Employee): Promise<CategoryDto[]> {
    const categories = await Category.find({
      where: { company: { id: EmployeeLogged.company.id } },
    });

    return categories.map((category) => new CategoryDto(category));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto & EmployeeLogged,
  ) {
    delete updateCategoryDto.employeeLogged;

    if (!(await Category.findOneBy({ id }))) {
      throw new HttpException(
        'Esta categoria não existe.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      updateCategoryDto.name &&
      (await Category.findOneBy({ name: updateCategoryDto.name }))
    ) {
      throw new HttpException(
        'Já existe categoria com este nome.',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const update = {};

    Object.keys(updateCategoryDto).forEach((key) => {
      if (updateCategoryDto[key] !== null) {
        Object.assign(update, { [key]: updateCategoryDto[key] });
      }
    });

    await Category.update({ id }, update);

    const categoryData = await Category.findOneBy({ id });

    return new CategoryDto(categoryData);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}

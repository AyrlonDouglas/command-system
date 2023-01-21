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
    if (!(await Category.findOneBy({ id }))) {
      throw new HttpException(
        'Esta categoria não existe.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      updateCategoryDto.name &&
      (await Category.findOneBy({
        name: updateCategoryDto.name,
        company: { id: updateCategoryDto.employeeLogged.company.id },
      }))
    ) {
      throw new HttpException(
        'Já existe categoria com este nome.',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete updateCategoryDto.employeeLogged;

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

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from '../employee/entities/employee.entity';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async create(
    createCategoryDto: CreateCategoryDto,
    employeeLogged: Employee,
  ): Promise<CategoryDto> {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.company = employeeLogged.company;

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

  async update(id: number, updateCategoryDto: UpdateCategoryDto, employeeLogged: Employee) {
    if (!(await Category.findOneBy({ id }))) {
      throw new HttpException('Esta categoria não existe.', HttpStatus.NOT_FOUND);
    }

    if (
      updateCategoryDto.name &&
      (await Category.findOneBy({
        name: updateCategoryDto.name,
        company: { id: employeeLogged.company.id },
      }))
    ) {
      throw new HttpException('Já existe categoria com este nome.', HttpStatus.CONFLICT);
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

  async remove(id: number, employeeLogged: Employee) {
    const category = await Category.findOne({
      where: { id, company: { id: employeeLogged.company.id } },
      relations: { items: true },
    });

    if (!category) {
      throw new HttpException('Categoria não existe', HttpStatus.PRECONDITION_REQUIRED);
    }

    if (category.items.length > 0) {
      throw new HttpException(
        'Você não pode excluir uma categoria em uso por algum item!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await category.remove();
  }
}

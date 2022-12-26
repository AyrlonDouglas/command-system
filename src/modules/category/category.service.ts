import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = new Category();
    category.name = createCategoryDto.name;

    const categoryData = await category.save();

    return new CategoryDto(categoryData);
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await Category.find();

    return categories.map((category) => new CategoryDto(category));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeeLogged } from 'src/helper/types/employeeLogged';
import { Employee } from '../employee/entities/employee.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const createCategoryDtoData = createCategoryDto as CreateCategoryDto &
      EmployeeLogged;
    return this.categoryService.create(createCategoryDtoData);
  }

  @Get()
  findAll(@Body('employeeLogged') employeeLogged: Employee) {
    return this.categoryService.findAll(employeeLogged);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updateCategoryDtoData = updateCategoryDto as UpdateCategoryDto &
      EmployeeLogged;

    return this.categoryService.update(+id, updateCategoryDtoData);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// service
import { ItemService } from './item.service';
// dto
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
// entity
import { Employee } from '../employee/entities/employee.entity';
// decorator
import EmployeeLogged from 'src/helper/decorators/employeeLogged.decorator';
import EntityManagerParam from 'src/helper/decorators/entityManager.decorator';
import { Permissions } from 'src/helper/decorators/permission.decorator';
// libs
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'fs/promises';

@ApiBearerAuth()
@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Permissions([{ entity: 'ITEM', action: 'CREATE' }])
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/items',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() createItemDto: any,
    @UploadedFile() file: Express.Multer.File,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    try {
      const createItem = new URLSearchParams(createItemDto);
      const createItemData = Object.fromEntries(createItem) as unknown as CreateItemDto;

      createItemData.avaliable = createItemDto.avaliable === 'true' ? true : false;

      return await this.itemService.create(createItemData, employeeLogged, entityManager, file);
    } catch (error) {
      if (file) {
        await unlink(file.path);
      }

      throw error;
    }
  }

  @Permissions([{ entity: 'ITEM', action: 'VIEW' }])
  @Get()
  findAll(
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.findAll(employeeLogged, entityManager);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itemService.findOne(+id);
  // }

  @Permissions([{ entity: 'ITEM', action: 'EDIT' }])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.update(+id, updateItemDto, employeeLogged, entityManager);
  }

  @Permissions([{ entity: 'ITEM', action: 'REMOVE' }])
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @EmployeeLogged() employeeLogged: Employee,
    @EntityManagerParam() entityManager: EntityManager,
  ) {
    return this.itemService.remove(+id, employeeLogged, entityManager);
  }
}

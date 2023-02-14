import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionDto } from './dto/permission.dto';
// import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  async create(createPermissionDto: CreatePermissionDto) {
    const permission = new Permission();
    permission.name = createPermissionDto.name;

    const permissionData = await permission.save();

    return new PermissionDto(permissionData);
  }

  async findAll() {
    const permissions = await Permission.find();

    return permissions.map((permission) => new PermissionDto(permission));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} permission`;
  // }

  // update(id: number, updatePermissionDto: UpdatePermissionDto) {
  //   return `This action updates a #${id} permission`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} permission`;
  // }
}

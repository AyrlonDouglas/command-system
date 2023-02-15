import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionDto } from './dto/permission.dto';
// import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  async create(createPermissionDto: CreatePermissionDto) {
    for (const permission of createPermissionDto.permissions) {
      const permissionExists = await Permission.findOneBy({
        entity: permission.entity,
        action: permission.action,
      });

      if (permissionExists) {
        throw new HttpException(
          `A permissão entity ${permissionExists.entity} action ${permissionExists.action} já existe`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const permissionsData: Permission[] = [];
    for (const permission of createPermissionDto.permissions) {
      const newPermission = new Permission();
      newPermission.entity = permission.entity;
      newPermission.action = permission.action;
      const permissionSaved = await newPermission.save();
      permissionsData.push(permissionSaved);
    }

    return permissionsData.map((permission) => new PermissionDto(permission));
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

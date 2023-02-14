import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';
import { Employee } from '../employee/entities/employee.entity';
// import { EEmployeeTypes } from 'src/helper/enum/employeeTypes';
// import * as bcrypt from 'bcrypt';
import { Role } from '../role/entities/role.entity';
import { RolePermission } from '../role-permission/entities/role-permission.entity';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyDto> {
    try {
      if (!/^[a-zA-Z]+$/.test(createCompanyDto.prefix)) {
        throw new HttpException(
          'O prefixo deve ser apenas letras!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const company = new Company();
      company.name = createCompanyDto.name;
      company.cnpj = createCompanyDto.cnpj;
      company.logo = createCompanyDto.logo;
      company.prefix = createCompanyDto.prefix.toLocaleUpperCase();

      const companySaved = await company.save();

      const mainRoles = await this.createMainRoles(companySaved);

      await this.createMainEmployees(companySaved, mainRoles);

      const companyData = await Company.findOneBy({ id: companySaved.id });

      return new CompanyDto(companyData);
    } catch (error) {
      throw new HttpException(error?.response, error?.status ?? 500);
    }
  }

  async findAll(): Promise<CompanyDto[]> {
    const companies = await Company.find();

    return companies.map((company) => new CompanyDto(company));
  }

  async createMainRoles(company: Company): Promise<Role[]> {
    const roleAdmin = new Role();
    roleAdmin.company = company;
    roleAdmin.name = 'admin';
    const roleAdminData = await roleAdmin.save();

    const roleBot = new Role();
    roleBot.company = company;
    roleBot.name = 'bot';
    const roleBotData = await roleBot.save();

    (await Permission.find()).forEach(async (elementPermission) => {
      const permission = await Permission.findOneBy({
        id: elementPermission.id,
      });

      await RolePermission.insert({ permission, role: roleAdminData });
      await RolePermission.insert({ permission, role: roleBotData });
    });

    return [roleAdminData, roleBotData];
  }

  async createMainEmployees(company: Company, roles: Role[]) {
    await Employee.insert({
      company: company,
      firstName: 'Admin',
      lastName: company.prefix,
      role: roles[0],
    });

    await Employee.insert({
      company: company,
      firstName: 'Bot',
      lastName: company.prefix,
      role: roles[1],
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} company`;
  // }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}

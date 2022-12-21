import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';
import { Employee } from '../employee/entities/employee.entity';

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

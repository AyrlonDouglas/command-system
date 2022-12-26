import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategorySubscriber } from 'src/modules/category/entities/category.entity';
import { CompanySubscriber } from 'src/modules/company/entities/company.entity';
import { EmployeeSubscriber } from 'src/modules/employee/entities/employee.entity';
import { ItemSubscriber } from 'src/modules/item/entities/item.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  LoadEvent,
  MixedList,
} from 'typeorm';

interface DatabaseConfigProps {
  development: TypeOrmModuleOptions;
  test: TypeOrmModuleOptions;
  production: TypeOrmModuleOptions;
}

export const databaseConfig = (): TypeOrmModuleOptions => {
  let config: TypeOrmModuleOptions;

  const subscribers: MixedList<string | any> = [
    CompanySubscriber,
    EmployeeSubscriber,
    DatabaseSubscriber,
    CategorySubscriber,
    ItemSubscriber,
  ];

  const options: DatabaseConfigProps = {
    development: {
      type: 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      autoLoadEntities: true,
      synchronize: true,
      subscribers: subscribers,
      logging: true,
    },
    test: {
      type: 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_TEST,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      autoLoadEntities: true,
      synchronize: true,
      subscribers: subscribers,
      logging: true,
    },
    production: {
      type: 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_PRODUCTION,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      autoLoadEntities: true,
      synchronize: true,
      subscribers: subscribers,
      logging: true,
    },
  };

  switch (process.env.NODE_ENV) {
    case 'development':
      config = options.development;
      break;
    case 'test':
      config = options.test;
      break;
    case 'production':
      config = options.production;
      break;
    default:
      config = options.development;
  }

  return config;
};

@EventSubscriber()
export class DatabaseSubscriber implements EntitySubscriberInterface {
  // listenTo() {}
  // async afterLoad(entity: any, event?: LoadEvent<any>): Promise<any> {
  //   console.log('ENTROU EM DATABASESUBCRISBER');
  //   event.
  //   if (process.env.DB_RESET) {
  //     await event.connection.dropDatabase();
  //     console.log('RESET DB');
  //   }
  // }
}

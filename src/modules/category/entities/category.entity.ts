import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Item } from 'src/modules/item/entities/item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Category;
  }
  async beforeInsert(event: InsertEvent<Category>): Promise<any> {
    const CategoryWithSameName = await Category.findOneBy({
      name: event.entity.name,
    });

    if (CategoryWithSameName) {
      throw new HttpException(
        'Já existe categoria com o mesmo nome cadastrada',
        HttpStatus.CONFLICT,
      );
    }
  }
}

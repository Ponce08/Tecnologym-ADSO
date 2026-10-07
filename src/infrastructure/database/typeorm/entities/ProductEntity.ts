import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CategoryEntity } from './CategoryEntity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name!: string;

  @Column({
    type: 'text',
  })
  description!: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  price!: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  stock!: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  image!: string | null;

  @Column({
    type: 'boolean',
    default: true,
  })
  active!: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category!: CategoryEntity;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt!: Date;
}

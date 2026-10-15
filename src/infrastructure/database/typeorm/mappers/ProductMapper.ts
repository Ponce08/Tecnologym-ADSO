import { Product } from '../../../../domain/entities/Products';
import { ProductEntity } from '../entities/ProductEntity';
import { CategoryMapper } from './CategoryMapper';

export class ProductMapper {
  static toDomain(entity: ProductEntity): Product {
    const idCategory = CategoryMapper.toDomain(entity.category);

    const resultProduct = {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stock: entity.stock,
      image: entity.image,
      active: entity.active,
      category: idCategory.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };

    return new Product(resultProduct);
  }
}

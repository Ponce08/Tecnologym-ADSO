import { Category } from '../../../../domain/entities/Category';
import { CategoryEntity } from '../entities/CategoryEntity';

export class CategoryMapper {
  static toDomain(entity: CategoryEntity): Category {
    return new Category(
      entity.id,
      entity.name,
      entity.description,
      entity.active,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}

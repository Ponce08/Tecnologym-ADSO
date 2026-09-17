import { Category } from '../../../domain/entities/Category';
import {
  CreateCategoryData,
  ICategoryRepository,
} from '../../../domain/repositories/CategoryRepository.interface';
import { AppError } from '../../errors/AppError';

export class CreateCategory {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategoryData): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(
      data.name,
    );

    if (existingCategory) {
      throw new AppError(
        'La categoría ya existe',
        409,
        'CATEGORY_ALREADY_EXISTS',
      );
    }

    return this.categoryRepository.create(data);
  }
}

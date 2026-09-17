import { Category } from '../../../domain/entities/Category';
import {
  ICategoryRepository,
  UpdateCategoryData,
} from '../../../domain/repositories/CategoryRepository.interface';
import { AppError } from '../../errors/AppError';

export class UpdateCategory {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(
    id: string | string[],
    data: UpdateCategoryData,
  ): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Categoría no encontrada', 404, 'CATEGORY_NOT_FOUND');
    }

    if (data.name) {
      const existingCategory = await this.categoryRepository.findByName(
        data.name,
      );

      if (existingCategory && existingCategory.id !== id) {
        throw new AppError(
          'Ya existe una categoría con ese nombre',
          409,
          'CATEGORY_ALREADY_EXISTS',
        );
      }
    }

    return this.categoryRepository.update(id, data);
  }
}

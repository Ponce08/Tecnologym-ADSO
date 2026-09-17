import { Category } from '../../../domain/entities/Category';
import { ICategoryRepository } from '../../../domain/repositories/CategoryRepository.interface';
import { AppError } from '../../errors/AppError';

export class GetCategoryById {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string | string[]): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Categoría no encontrada', 404, 'CATEGORY_NOT_FOUND');
    }

    return category;
  }
}

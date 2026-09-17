import { ICategoryRepository } from '../../../domain/repositories/CategoryRepository.interface';
import { AppError } from '../../errors/AppError';

export class DeleteCategory {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string | string[]): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Categoría no encontrada', 404, 'CATEGORY_NOT_FOUND');
    }

    await this.categoryRepository.delete(id);
  }
}

import { ICategoryRepository } from '../../../domain/repositories/CategoryRepository.interface';
import {
  CreateProductData,
  IProductRepository,
} from '../../../domain/repositories/ProductRepository.interface';
import { AppError } from '../../errors/AppError';

export class CreateProduct {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: CreateProductData) {
    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) {
      throw new AppError('La categoria no existe.', 404, 'CATEGORY_NOT_EXISTS');
    }

    return this.productRepository.create({
      ...data,
      category,
    });
  }
}

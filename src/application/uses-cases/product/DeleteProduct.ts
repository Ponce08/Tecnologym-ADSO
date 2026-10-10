import { IProductRepository } from '../../../domain/repositories/ProductRepository.interface';
import { AppError } from '../../errors/AppError';

export class DeleteProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('PRODUCT_NOT_FOUND', 404, 'Producto no encontrado');
    }

    await this.productRepository.delete(id);
  }
}

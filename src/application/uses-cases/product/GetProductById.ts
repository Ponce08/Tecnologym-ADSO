import { IProductRepository } from '../../../domain/repositories/ProductRepository.interface';
import { AppError } from '../../errors/AppError';

export class GetProductById {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('PRODUCT_NOT_FOUND', 404, 'Producto no encontrado');
    }

    return product;
  }
}

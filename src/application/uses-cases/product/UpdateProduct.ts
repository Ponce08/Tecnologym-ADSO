import {
  IProductRepository,
  UpdateProductData,
} from '../../../domain/repositories/ProductRepository.interface';
import { AppError } from '../../errors/AppError';

export class UpdateProduct {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, data: UpdateProductData) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Producto no encontrado', 404, 'PRODUCT_NOT_FOUND');
    }

    const { price, stock, active, ...details } = data;

    product.updateDetails(details);

    if (price !== undefined) {
      product.changePrice(price);
    }

    if (stock !== undefined) {
      const difference = stock - product.stock;

      if (difference > 0) {
        product.increaseStock(difference);
      } else if (difference < 0) {
        product.decreaseStock(Math.abs(difference));
      }
    }

    if (active !== undefined) {
      active ? product.activate() : product.deactivate();
    }

    return this.productRepository.update(id, product);
  }
}

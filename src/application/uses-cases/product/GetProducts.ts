import {
  IProductRepository,
  ProductFilters,
} from '../../../domain/repositories/ProductRepository.interface';

export class GetProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(filters: ProductFilters) {
    return this.productRepository.findAll(filters);
  }
}

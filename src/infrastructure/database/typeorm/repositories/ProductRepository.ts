import { Product } from '../../../../domain/entities/Products';
import {
  IProductRepository,
  PaginatedResult,
  ProductFilters,
  UpdateProductData,
} from '../../../../domain/repositories/ProductRepository.interface';
import { AppDataSource } from '../../../config/AppDataSource';
import { ProductEntity } from '../entities/ProductEntity';
import { ProductMapper } from '../mappers/ProductMapper';

export class ProductRepository implements IProductRepository {
  private readonly repository = AppDataSource.getRepository(ProductEntity);

  async create(product: Product): Promise<Product> {
    const savedEntity = await this.repository.save(product);

    return ProductMapper.toDomain(savedEntity);
  }

  async findAll(
    filters: ProductFilters = {},
  ): Promise<PaginatedResult<Product>> {
    const {
      search,
      categoryId,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = filters;

    const query = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (categoryId) {
      query.andWhere('category.id = :categoryId', {
        categoryId,
      });
    }

    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', {
        maxPrice,
      });
    }

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(limit, 100));

    query
      .skip((safePage - 1) * safeLimit)
      .take(safeLimit)
      .orderBy('product.createdAt', 'DESC');

    const [entities, total] = await query.getManyAndCount();

    return {
      data: entities.map(ProductMapper.toDomain),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    };
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });

    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async update(id: string, data: UpdateProductData): Promise<Product | null> {
    await this.repository.update(id, data);

    const updatedProduct = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });

    return updatedProduct ? ProductMapper.toDomain(updatedProduct) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

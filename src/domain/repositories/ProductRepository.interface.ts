import { Product } from '../entities/Products';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  categoryId: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string | null;
  categoryId?: string;
  active?: boolean;
}

export type ProductSortField = 'name' | 'price' | 'stock' | 'createdAt';

export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
  sortBy?: ProductSortField;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IProductRepository {
  create(data: CreateProductData): Promise<Product>;

  findAll(filters: ProductFilters): Promise<PaginatedResult<Product>>;

  findById(id: string): Promise<Product | null>;

  update(id: string, data: UpdateProductData): Promise<Product | null>;

  delete(id: string): Promise<void>;
}

import { Category } from '../entities/Category';

export interface CreateCategoryData {
  name: string;
  description?: string | null;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string | null;
}

export interface ICategoryRepository {
  delete(id: string | string[]): Promise<void>;

  create(data: CreateCategoryData): Promise<Category>;

  findAll(includeInactive?: boolean): Promise<Category[]>;

  findById(id: string | string[]): Promise<Category | null>;

  findByName(name: string): Promise<Category | null>;

  update(id: string | string[], data: UpdateCategoryData): Promise<Category>;

  deactivate(id: string | string[]): Promise<void>;
}

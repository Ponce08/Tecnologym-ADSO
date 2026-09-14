import { Repository } from 'typeorm';

import { Category } from '../../../../domain/entities/Category';
import {
  CreateCategoryData,
  ICategoryRepository,
  UpdateCategoryData,
} from '../../../../domain/repositories/CategoryRepository.interface';

import { CategoryEntity } from '../entities/CategoryEntity';
import { CategoryMapper } from '../mappers/CategoryMapper';
import { AppDataSource } from '../../../config/AppDataSource';
import { AppError } from '../../../../application/errors/AppError';

export class CategoryRepository implements ICategoryRepository {
  private readonly repository: Repository<CategoryEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CategoryEntity);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    const entity = this.repository.create({
      name: data.name,
      description: data.description ?? null,
    });

    const savedEntity = await this.repository.save(entity);

    return CategoryMapper.toDomain(savedEntity);
  }

  async findAll(includeInactive = false): Promise<Category[]> {
    const entities = await this.repository.find({
      where: includeInactive ? {} : { active: true },
      order: {
        name: 'ASC',
      },
    });

    return entities.map(CategoryMapper.toDomain);
  }

  async findById(id: string): Promise<Category | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const entity = await this.repository.findOne({
      where: { name },
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    await this.repository.update(id, data);

    const updatedEntity = await this.repository.findOne({
      where: { id },
    });

    if (!updatedEntity) {
      throw new AppError(
        'La categoría no fue encontrada después de actualizar.',
        404,
        'CATEGORY_NOT_FOUND',
      );
    }

    return CategoryMapper.toDomain(updatedEntity);
  }

  async deactivate(id: string): Promise<void> {
    await this.repository.update(id, {
      active: false,
    });
  }
}

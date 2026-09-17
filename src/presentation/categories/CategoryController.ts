import { Request, Response } from 'express';

import { CreateCategory } from '../../application/uses-cases/categories/CreateCategory';
import { GetCategories } from '../../application/uses-cases/categories/GetCategories';
import { GetCategoryById } from '../../application/uses-cases/categories/GetCategoryById';
import { UpdateCategory } from '../../application/uses-cases/categories/UpdateCategory';
import { DeleteCategory } from '../../application/uses-cases/categories/DeleteCategory';

export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategory,
    private readonly getCategories: GetCategories,
    private readonly getCategoryById: GetCategoryById,
    private readonly updateCategory: UpdateCategory,
    private readonly deleteCategory: DeleteCategory,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const category = await this.createCategory.execute(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const categories = await this.getCategories.execute();

    res.status(200).json({
      success: true,
      data: categories,
    });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const category = await this.getCategoryById.execute(id);

    res.status(200).json({
      success: true,
      data: category,
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const category = await this.updateCategory.execute(id, req.body);

    res.status(200).json({
      success: true,
      data: category,
    });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.deleteCategory.execute(id);

    res.status(204).send();
  }
}

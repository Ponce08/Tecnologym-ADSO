import { Request, Response } from 'express';
import { CreateProduct } from '../../application/uses-cases/product/CreateProduct';
import { GetProducts } from '../../application/uses-cases/product/GetProducts';
import { GetProductById } from '../../application/uses-cases/product/GetProductById';
import { UpdateProduct } from '../../application/uses-cases/product/UpdateProduct';
import { DeleteProduct } from '../../application/uses-cases/product/DeleteProduct';

export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly getProducts: GetProducts,
    private readonly getProductById: GetProductById,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct,
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const product = await this.createProduct.execute(req.body);

    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: product,
    });
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    const products = await this.getProducts.execute(req.query);

    res.status(200).json({
      success: true,
      data: products,
    });
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    const product = await this.getProductById.execute(id);

    res.status(200).json({
      success: true,
      data: product,
    });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    const product = await this.updateProduct.execute(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      data: product,
    });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;

    await this.deleteProduct.execute(id);

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente',
    });
  };
}

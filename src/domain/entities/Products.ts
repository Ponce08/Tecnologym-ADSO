import { AppError } from '../../application/errors/AppError';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  active: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  constructor(private readonly props: ProductProps) {
    if (!props.name.trim()) {
      throw new AppError(
        'El nombre del producto es obligatorio',
        400,
        'PRODUCT_NAME_REQUIRED',
      );
    }

    if (props.price < 0) {
      throw new AppError(
        'El precio no puede ser negativo',
        400,
        'INVALID_PRODUCT_PRICE',
      );
    }

    if (props.stock < 0) {
      throw new AppError(
        'El stock no puede ser negativo',
        400,
        'INVALID_PRODUCT_STOCK',
      );
    }
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  get image(): string | null {
    return this.props.image;
  }

  get active(): boolean {
    return this.props.active;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  changePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new AppError(
        'El precio no puede ser negativo',
        400,
        'INVALID_PRODUCT_PRICE',
      );
    }

    this.props.price = newPrice;
    this.props.updatedAt = new Date();
  }

  decreaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new AppError(
        'La cantidad debe ser mayor que cero',
        400,
        'INVALID_STOCK_QUANTITY',
      );
    }

    if (quantity > this.props.stock) {
      throw new AppError('Stock insuficiente', 400, 'INSUFFICIENT_STOCK');
    }

    this.props.stock -= quantity;
    this.props.updatedAt = new Date();
  }

  increaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new AppError(
        'La cantidad debe ser mayor que cero',
        400,
        'INVALID_STOCK_QUANTITY',
      );
    }

    this.props.stock += quantity;
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.active = true;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.active = false;
    this.props.updatedAt = new Date();
  }
}

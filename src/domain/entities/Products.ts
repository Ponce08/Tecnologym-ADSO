import { DomainError } from '../errors/DomainError';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  active: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  constructor(private readonly props: ProductProps) {}

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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  changePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new DomainError(
        'El precio no puede ser negativo',
        'INVALID_PRODUCT_PRICE',
      );
    }

    this.props.price = newPrice;
    this.props.updatedAt = new Date();
  }

  decreaseStock(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new DomainError(
        'La cantidad debe ser un entero mayor que cero',
        'INVALID_STOCK_QUANTITY',
      );
    }

    if (quantity > this.props.stock) {
      throw new DomainError('Stock insuficiente', 'INSUFFICIENT_STOCK');
    }

    this.props.stock -= quantity;
    this.props.updatedAt = new Date();
  }

  increaseStock(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new DomainError(
        'La cantidad debe ser un entero mayor que cero',
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

  updateDetails(data: {
    name?: string;
    description?: string;
    image?: string | null;
    categoryId?: string;
  }): void {
    if (data.name !== undefined) {
      this.props.name = data.name;
    }

    if (data.description !== undefined) {
      this.props.description = data.description;
    }

    if (data.image !== undefined) {
      this.props.image = data.image;
    }

    this.props.updatedAt = new Date();
  }
}

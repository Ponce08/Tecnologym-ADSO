import { DomainError } from '../errors/DomainError';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItemProps {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export class OrderItem {
  constructor(private readonly props: OrderItemProps) {
    this.validateQuantity(props.quantity);
    this.validatePrice(props.unitPrice);
  }

  get id(): string {
    return this.props.id;
  }

  get productId(): string {
    return this.props.productId;
  }

  get productName(): string {
    return this.props.productName;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unitPrice(): number {
    return this.props.unitPrice;
  }

  get subtotal(): number {
    return this.props.quantity * this.props.unitPrice;
  }

  private validateQuantity(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new DomainError(
        'La cantidad debe ser un entero mayor que cero',
        'INVALID_ORDER_ITEM_QUANTITY',
      );
    }
  }

  private validatePrice(price: number): void {
    if (!Number.isFinite(price) || price < 0) {
      throw new DomainError(
        'El precio unitario no puede ser negativo',
        'INVALID_ORDER_ITEM_PRICE',
      );
    }
  }
}

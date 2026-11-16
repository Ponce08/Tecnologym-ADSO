import { DomainError } from '../errors/DomainError';
import { OrderItem, OrderStatus } from './OrderItem';

export interface OrderProps {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Order {
  constructor(private readonly props: OrderProps) {
    if (props.items.length === 0) {
      throw new DomainError(
        'El pedido debe contener al menos un producto',
        'EMPTY_ORDER',
      );
    }
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get items(): OrderItem[] {
    return [...this.props.items];
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get total(): number {
    return this.props.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  confirm(): void {
    this.ensureStatus(OrderStatus.PENDING);
    this.props.status = OrderStatus.CONFIRMED;
    this.props.updatedAt = new Date();
  }

  ship(): void {
    this.ensureStatus(OrderStatus.CONFIRMED);
    this.props.status = OrderStatus.SHIPPED;
    this.props.updatedAt = new Date();
  }

  deliver(): void {
    this.ensureStatus(OrderStatus.SHIPPED);
    this.props.status = OrderStatus.DELIVERED;
    this.props.updatedAt = new Date();
  }

  cancel(): void {
    if (
      this.props.status !== OrderStatus.PENDING &&
      this.props.status !== OrderStatus.CONFIRMED
    ) {
      throw new DomainError(
        'Solo se pueden cancelar pedidos pendientes o confirmados',
        'ORDER_CANNOT_BE_CANCELLED',
      );
    }

    this.props.status = OrderStatus.CANCELLED;
    this.props.updatedAt = new Date();
  }

  private ensureStatus(expected: OrderStatus): void {
    if (this.props.status !== expected) {
      throw new DomainError(
        `La operación requiere que el pedido esté en estado ${expected}`,
        'INVALID_ORDER_STATUS',
      );
    }
  }
}

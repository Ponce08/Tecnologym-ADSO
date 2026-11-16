import { Order } from '../entities/Order';
import { OrderStatus } from '../entities/OrderItem';

export interface OrderFilters {
  userId?: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export interface PaginatedOrders {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IOrderRepository {
  create(order: Order): Promise<Order>;

  findById(id: string): Promise<Order | null>;

  findAll(filters: OrderFilters): Promise<PaginatedOrders>;

  update(order: Order): Promise<Order>;
}

import {
  IOrderRepository,
  OrderFilters,
  PaginatedOrders,
} from '../../../domain/repositories/OrderRepository.interface';

export class FindAllOrders {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(filters: OrderFilters = {}): Promise<PaginatedOrders> {
    return this.orderRepository.findAll(filters);
  }
}

import { Order } from '../../../domain/entities/Order';
import { IOrderRepository } from '../../../domain/repositories/OrderRepository.interface';
import { AppError } from '../../errors/AppError';

export class FindOrderById {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404, 'ORDER_NOT_FOUND');
    }

    return order;
  }
}

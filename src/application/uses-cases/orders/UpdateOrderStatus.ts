import { Order } from '../../../domain/entities/Order';
import { OrderStatus } from '../../../domain/entities/OrderItem';
import { IOrderRepository } from '../../../domain/repositories/OrderRepository.interface';
import { AppError } from '../../errors/AppError';

interface UpdateOrderData {
  id: string;
  status: OrderStatus;
}

export class UpdateOrder {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: UpdateOrderData): Promise<Order> {
    const order = await this.orderRepository.findById(data.id);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404, 'ORDER_NOT_FOUND');
    }

    switch (data.status) {
      case OrderStatus.CONFIRMED:
        order.confirm();
        break;

      case OrderStatus.SHIPPED:
        order.ship();
        break;

      case OrderStatus.DELIVERED:
        order.deliver();
        break;

      case OrderStatus.CANCELLED:
        order.cancel();
        break;

      default:
        throw new AppError(
          'Estado de pedido no válido para esta operación',
          400,
          'INVALID_ORDER_STATUS',
        );
    }

    return this.orderRepository.update(order);
  }
}

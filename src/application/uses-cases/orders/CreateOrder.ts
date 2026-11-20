import { randomUUID } from 'node:crypto';
import { IOrderRepository } from '../../../domain/repositories/OrderRepository.interface';
import { IProductRepository } from '../../../domain/repositories/ProductRepository.interface';
import { AppError } from '../../errors/AppError';
import { Order } from '../../../domain/entities/Order';
import { OrderItem, OrderStatus } from '../../../domain/entities/OrderItem';

export interface CreateOrderItemData {
  productId: string;
  quantity: number;
}

export interface CreateOrderData {
  userId: string;
  items: CreateOrderItemData[];
}

export class CreateOrder {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(data: CreateOrderData): Promise<Order> {
    if (!data.items || data.items.length === 0) {
      throw new AppError(
        'El pedido debe contener al menos un producto',
        400,
        'EMPTY_ORDER',
      );
    }

    // Evitar productos repetidos en el mismo pedido
    const productIds = data.items.map((item) => item.productId);

    if (new Set(productIds).size !== productIds.length) {
      throw new AppError(
        'No se permiten productos duplicados en el pedido',
        400,
        'DUPLICATE_ORDER_ITEMS',
      );
    }

    const orderItems: OrderItem[] = [];

    for (const item of data.items) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new AppError(
          'La cantidad debe ser un entero mayor que cero',
          400,
          'INVALID_ORDER_ITEM_QUANTITY',
        );
      }

      const product = await this.productRepository.findById(item.productId);

      if (!product) {
        throw new AppError(
          `No existe el producto ${item.productId}`,
          404,
          'PRODUCT_NOT_FOUND',
        );
      }

      if (!product.active) {
        throw new AppError(
          `El producto ${product.name} no está disponible`,
          400,
          'PRODUCT_NOT_AVAILABLE',
        );
      }

      if (product.stock < item.quantity) {
        throw new AppError(
          `Stock insuficiente para el producto ${product.name}`,
          400,
          'INSUFFICIENT_PRODUCT_STOCK',
        );
      }

      orderItems.push(
        new OrderItem({
          id: randomUUID(),
          productId: product.id,
          productName: product.name,
          quantity: item.quantity,
          unitPrice: Number(product.price),
        }),
      );
    }

    const order = new Order({
      id: randomUUID(),
      userId: data.userId,
      items: orderItems,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.orderRepository.create(order);
  }
}

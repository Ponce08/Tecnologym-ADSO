import { Order } from '../../../../domain/entities/Order';
import { OrderItem } from '../../../../domain/entities/OrderItem';
import { OrderEntity } from '../entities/OrderEntity';
import { OrderItemEntity } from '../entities/OrderItemEntity';

export class OrderMapper {
  static toDomain(entity: OrderEntity): Order {
    const items = entity.items.map((item) => OrderMapper.itemToDomain(item));

    return new Order({
      id: entity.id,
      userId: entity.user.id,
      items,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  // static toPersistence(order: Order): OrderEntity {
  //   const entity = new OrderEntity();

  //   entity.id = order.id;
  //   entity.user = { id: order.userId } as any;
  //   entity.status = order.status;
  //   entity.items = order.items.map((item) =>
  //     OrderMapper.itemToPersistence(item),
  //   );

  //   return entity;
  // }

  static itemToDomain(entity: OrderItemEntity): OrderItem {
    return new OrderItem({
      id: entity.id,
      productId: entity.product.id,
      productName: entity.productName,
      quantity: entity.quantity,
      unitPrice: Number(entity.unitPrice),
    });
  }

  // static itemToPersistence(item: OrderItem): OrderItemEntity {
  //   const entity = new OrderItemEntity();

  //   entity.id = item.id;
  //   entity.product = { id: item.productId } as any;
  //   entity.productName = item.productName;
  //   entity.quantity = item.quantity;
  //   entity.unitPrice = item.unitPrice.toString();

  //   return entity;
  // }
}

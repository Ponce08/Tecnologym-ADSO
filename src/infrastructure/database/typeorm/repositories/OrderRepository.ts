import { AppError } from '../../../../application/errors/AppError';
import { Order } from '../../../../domain/entities/Order';
import { OrderItem } from '../../../../domain/entities/OrderItem';
import {
  IOrderRepository,
  OrderFilters,
  PaginatedOrders,
} from '../../../../domain/repositories/OrderRepository.interface';
import { AppDataSource } from '../../../config/AppDataSource';
import { OrderEntity } from '../entities/OrderEntity';
import { ProductEntity } from '../entities/ProductEntity';
import { OrderMapper } from '../mappers/OrderMapper';

export class OrderRepository implements IOrderRepository {
  private readonly repository = AppDataSource.getRepository(OrderEntity);

  async create(order: Order): Promise<Order> {
    return AppDataSource.transaction(async (manager) => {
      const productRepository = manager.getRepository(ProductEntity);

      const updatedItems: OrderItem[] = [];

      for (const item of order.items) {
        // Bloquear el producto para evitar compras simultáneas
        const product = await productRepository.findOne({
          where: { id: item.productId },
          lock: { mode: 'pessimistic_write' },
        });

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
            `Stock insuficiente para ${product.name}`,
            400,
            'INSUFFICIENT_PRODUCT_STOCK',
          );
        }

        // Descontar inventario
        product.stock -= item.quantity;

        await productRepository.save(product);

        // Utilizar el precio y nombre actuales de la base de datos
        updatedItems.push(
          new OrderItem({
            id: item.id,
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            unitPrice: Number(product.price),
          }),
        );
      }

      // Reconstruir el pedido con los datos actualizados
      const orderWithCurrentPrices = new Order({
        id: order.id,
        userId: order.userId,
        items: updatedItems,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      });

      // Guardar pedido y artículos
      await manager.save(orderWithCurrentPrices);

      // Recuperar pedido completo
      const savedEntity = await manager.findOne(OrderEntity, {
        where: { id: order.id },
        relations: {
          user: true,
          items: {
            product: true,
          },
        },
      });

      if (!savedEntity) {
        throw new AppError(
          'No se pudo recuperar el pedido creado',
          500,
          'ORDER_CREATION_FAILED',
        );
      }

      return OrderMapper.toDomain(savedEntity);
    });
  }

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    return entity ? OrderMapper.toDomain(entity) : null;
  }

  async findAll(filters: OrderFilters = {}): Promise<PaginatedOrders> {
    const requestedPage = filters.page ?? 1;
    const requestedLimit = filters.limit ?? 10;

    const page =
      Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const limit =
      Number.isInteger(requestedLimit) && requestedLimit > 0
        ? Math.min(requestedLimit, 100)
        : 10;

    const query = this.repository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product');

    if (filters.userId) {
      query.andWhere('user.id = :userId', {
        userId: filters.userId,
      });
    }

    if (filters.status) {
      query.andWhere('order.status = :status', {
        status: filters.status,
      });
    }

    const [entities, total] = await query
      .orderBy('order.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: entities.map((entity) => OrderMapper.toDomain(entity)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(order: Order): Promise<Order> {
    return AppDataSource.transaction(async (manager) => {
      const orderEntity = await manager.findOne(OrderEntity, {
        where: { id: order.id },
      });

      if (!orderEntity) {
        throw new AppError('Pedido no encontrado', 404, 'ORDER_NOT_FOUND');
      }

      // Aplicar los cambios de dominio a la entidad ORM
      orderEntity.status = order.status;

      // Persistir los cambios
      await manager.save(OrderEntity, orderEntity);

      const updatedEntity = await manager.findOne(OrderEntity, {
        where: { id: order.id },
        relations: {
          user: true,
          items: {
            product: true,
          },
        },
      });

      if (!updatedEntity) {
        throw new AppError(
          'No se pudo recuperar el pedido actualizado',
          500,
          'ORDER_UPDATE_FAILED',
        );
      }

      return OrderMapper.toDomain(updatedEntity);
    });
  }
}

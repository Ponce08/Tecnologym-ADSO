import { Request, Response } from 'express';
import { CreateOrder } from '../../application/uses-cases/orders/CreateOrder';
import { FindOrderById } from '../../application/uses-cases/orders/FindOrderById';
import { FindAllOrders } from '../../application/uses-cases/orders/FindAllOrders';
import { UpdateOrder } from '../../application/uses-cases/orders/UpdateOrderStatus';
import { AppError } from '../../application/errors/AppError';
import { OrderFilters } from '../../domain/repositories/OrderRepository.interface';
import { OrderStatus } from '../../domain/entities/OrderItem';

export class OrderController {
  constructor(
    private readonly createOrder: CreateOrder,
    private readonly findOrderById: FindOrderById,
    private readonly findAllOrders: FindAllOrders,
    private readonly updateOrder: UpdateOrder,
  ) {}

  private isAdmin(role: string): boolean {
    return role.toLowerCase() === 'admin';
  }

  // POST /orders
  create = async (req: Request, res: Response) => {
    const order = await this.createOrder.execute({
      userId: req.user.sub,
      items: req.body.items,
    });

    return res.status(201).json({
      success: true,
      message: 'Pedido creado correctamente',
      data: order,
    });
  };

  // GET /orders/:id
  findById = async (req: Request, res: Response) => {
    const order = await this.findOrderById.execute(String(req.params.id));

    // Los clientes solamente pueden consultar sus propios pedidos
    if (!this.isAdmin(req.user.role) && order.userId !== req.user.sub) {
      throw new AppError(
        'No tienes permiso para consultar este pedido',
        403,
        'PERMISSION_DENIED',
      );
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  };

  // GET /orders
  findAll = async (req: Request, res: Response) => {
    const isAdmin = this.isAdmin(req.user.role);

    const filters: OrderFilters = {
      status: req.query.status as OrderStatus | undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    if (isAdmin) {
      // El administrador puede filtrar por cualquier usuario
      if (req.query.userId) {
        filters.userId = String(req.query.userId);
      }
    } else {
      // El cliente siempre consulta sus propios pedidos
      filters.userId = req.user.sub;
    }

    const result = await this.findAllOrders.execute(filters);

    return res.status(200).json({
      success: true,
      ...result,
    });
  };

  // PATCH /orders/:id/status
  update = async (req: Request, res: Response) => {
    const order = await this.updateOrder.execute({
      id: req.params.id as string,
      status: req.body.status,
    });

    return res.status(200).json({
      success: true,
      message: 'Pedido actualizado correctamente',
      data: order,
    });
  };
}

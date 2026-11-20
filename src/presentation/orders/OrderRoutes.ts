import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { OrderController } from './OrderController';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import {
  createOrderSchema,
  findAllOrdersSchema,
  orderIdSchema,
  updateOrderStatusSchema,
} from '../../infrastructure/schemas-zod/orders/order.schemas';
import { tokenService } from '../../composition/root';

export const OrderRoutes = (controller: OrderController): Router => {
  const router = Router();

  // Todas las rutas requieren autenticación
  router.use(authMiddleware(tokenService));

  router.post(
    '/',
    validateMiddleware(createOrderSchema, 'body'),
    controller.create,
  );

  // Consultar todos los pedidos (con filtros y paginación)
  router.get(
    '/',
    validateMiddleware(findAllOrdersSchema, 'query'),
    controller.findAll,
  );

  // Consultar un pedido por ID
  router.get(
    '/:id',
    validateMiddleware(orderIdSchema, 'params'),
    controller.findById,
  );

  // Actualizar el estado de un pedido
  router.patch(
    '/:id/status',
    roleMiddleware('Admin'),
    validateMiddleware(orderIdSchema, 'params'),
    validateMiddleware(updateOrderStatusSchema, 'body'),
    controller.update,
  );

  return router;
};

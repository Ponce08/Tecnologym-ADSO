import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { OrderController } from './OrderController';

export const OrderRoutes = (controller: OrderController): Router => {
  const router = Router();

  // Todas las rutas requieren autenticación
  router.use(authMiddleware);

  // Crear un pedido
  router.post('/', controller.create);

  // Consultar todos los pedidos (con filtros y paginación)
  router.get('/', controller.findAll);

  // Consultar un pedido por ID
  router.get('/:id', controller.findById);

  // Actualizar el estado de un pedido
  router.patch('/:id/status', roleMiddleware('Admin'), controller.update);

  return router;
};

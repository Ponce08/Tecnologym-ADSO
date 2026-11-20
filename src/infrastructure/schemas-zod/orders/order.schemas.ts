import { z } from 'zod';
import { OrderStatus } from '../../../domain/entities/OrderItem';

// ─────────────────────────────────────────────
// Crear pedido
// ─────────────────────────────────────────────

export const createOrderSchema = z
  .object({
    items: z
      .array(
        z.object({
          productId: z.uuid('El ID del producto debe ser un UUID válido'),
          quantity: z
            .number()
            .int('La cantidad debe ser un número entero')
            .positive('La cantidad debe ser mayor que cero'),
        }),
      )
      .min(1, 'El pedido debe contener al menos un producto'),
  })
  .strict();

// ─────────────────────────────────────────────
// ID del pedido (params)
// ─────────────────────────────────────────────

export const orderIdSchema = z
  .object({
    id: z.uuid('El ID del pedido debe ser un UUID válido'),
  })
  .strict();

// ─────────────────────────────────────────────
// Actualizar estado del pedido
// ─────────────────────────────────────────────

export const updateOrderStatusSchema = z
  .object({
    status: z.enum(OrderStatus, {
      error: 'El estado del pedido no es válido',
    }),
  })
  .strict();

// ─────────────────────────────────────────────
// Consultar pedidos (query params)
// ─────────────────────────────────────────────

export const findAllOrdersSchema = z.object({
  status: z.enum(OrderStatus).optional(),

  page: z.coerce
    .number()
    .int('La página debe ser un número entero')
    .positive('La página debe ser mayor que cero')
    .optional(),

  limit: z.coerce
    .number()
    .int('El límite debe ser un número entero')
    .positive('El límite debe ser mayor que cero')
    .optional(),
});

// ─────────────────────────────────────────────
// Tipos inferidos
// ─────────────────────────────────────────────

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderIdInput = z.infer<typeof orderIdSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type FindAllOrdersInput = z.infer<typeof findAllOrdersSchema>;

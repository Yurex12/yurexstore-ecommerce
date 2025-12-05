import { z } from 'zod';

export const OrderItemSchema = z.object({
  productId: z.string().min(1, 'Product Id is required'),
  productVariantId: z.string().nullable().optional(),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});

export const OrderSchema = z.object({
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  paymentMethod: z.enum(['CASH_ON_DELIVERY', 'STRIPE']),
  orderItems: z
    .array(OrderItemSchema)
    .min(1, 'At least one order item is required'),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;

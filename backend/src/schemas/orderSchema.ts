import { z } from 'zod';

export const OrderSchema = z.object({
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

export type Order = z.infer<typeof OrderSchema>;

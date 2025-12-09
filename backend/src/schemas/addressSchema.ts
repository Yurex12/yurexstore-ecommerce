import { z } from 'zod';

export const createAddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  default: z.boolean().optional().default(false),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long'),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressSchema = z.infer<typeof createAddressSchema>;
export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>;

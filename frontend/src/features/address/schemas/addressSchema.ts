import z from 'zod';

export const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  deliveryAddress: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  phone: z.string().min(10, 'Invalid phone number'),
  default: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

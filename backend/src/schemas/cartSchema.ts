import z from 'zod';

export const cartSchema = z.object({
  productId: z.string().trim().nonempty('Product is required'),
});

export type CartSchema = z.infer<typeof cartSchema>;

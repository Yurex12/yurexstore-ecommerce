import z from 'zod';

export const cartSchema = z.object({
  productId: z.string().trim().nonempty('Product is required'),
  productVariantId: z.string().trim().min(1).optional(),
});

export type CartSchema = z.infer<typeof cartSchema>;

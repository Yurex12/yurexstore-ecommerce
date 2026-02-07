import z from 'zod';
export const reviewSchema = z.object({
  content: z
    .string()
    .trim()
    .min(10, 'Content should be at least 10 characters')
    .max(500, 'Content should not be more than 500 characters')
    .or(z.literal(''))
    .transform((val) => (val === '' ? null : val)),

  rating: z.coerce
    .number()
    .int()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),

  productId: z.string().trim().min(1, 'Product is required'),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

import z from 'zod';

export const reviewSchema = z.object({
  content: z
    .string()
    .trim()
    .min(10, 'Content should be at least 10 character')
    .max(500, 'Content should not be more than 500 characters')
    .optional(),

  rating: z.coerce
    .number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),

  productId: z.string().trim().nonempty('Product is required'),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

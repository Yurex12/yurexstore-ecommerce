import z from 'zod';

export const reviewSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'Content is required')
    .max(500, 'Content should not be more than 500 characters'),

  rating: z.coerce
    .number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),

  productId: z.string().trim().nonempty('Product is required'),
  userId: z.string().trim().nonempty('User is required'),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

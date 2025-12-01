import z from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required'),
  reviewText: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: 'Review must be at least 10 characters',
    }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

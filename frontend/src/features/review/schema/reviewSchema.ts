import z from 'zod';

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.union([
    z
      .string()
      .trim()
      .min(10, { message: 'Review must be at least 10 characters' }),
    z.literal(''),
  ]),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

import z from 'zod';

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z
    .string()
    .trim()
    .refine((val) => val === '' || val.length >= 10, {
      message: 'Review must be at least 10 characters',
    }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

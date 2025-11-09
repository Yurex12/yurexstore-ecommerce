import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters long')
    .max(50, 'Category name must not exceed 50 characters'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long')
    .max(200, 'Description must not exceed 200 characters'),
  image: z
    .instanceof(File, { error: 'Please upload an image file' })
    .refine(
      (file) => file.size <= 1 * 1024 * 1024,
      'Image must be less than 1 MB'
    )
    .refine((file) => file.type === 'image/png', 'Only PNG files are allowed'),
});

export const editCategorySchema = createCategorySchema.partial();

export type CategoryFormValues = z.infer<typeof createCategorySchema>;
export type EditCategoryFormValues = z.infer<typeof editCategorySchema>;

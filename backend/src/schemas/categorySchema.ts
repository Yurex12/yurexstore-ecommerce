import z from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().nonempty('Name is required'),
  image: z.url().nonempty('Please provide an image url'),
  description: z.string().nonempty('Description is required'),
});

export const categoryUpdateSchema = categorySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'At least one field must be provided to update',
  });

export type CategorySchema = z.infer<typeof categorySchema>;
export type CategoryUpdateSchema = z.infer<typeof categoryUpdateSchema>;

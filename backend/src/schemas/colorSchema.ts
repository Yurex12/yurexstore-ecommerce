import z from 'zod';

export const colorSchema = z.object({
  name: z.string().trim().nonempty('Color name is required').toLowerCase(),
  code: z.string().trim().nonempty('Color name is required'),
});

export const updateColorSchema = colorSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'At least one field must be provided to update',
  });

export type ColorSchema = z.infer<typeof colorSchema>;
export type UpdateColorSchema = z.infer<typeof updateColorSchema>;

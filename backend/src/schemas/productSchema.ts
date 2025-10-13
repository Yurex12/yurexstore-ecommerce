import z from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(30, 'Name should not be more than 30 characters.'),
  description: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(500, 'Name should not be more than 500 characters.'),
  gender: z
    .string()
    .refine((val) => val === 'MALE' || val === 'FEMALE' || val === 'BOTH', {
      error: 'Gender must be male, female or both',
    }),
  price: z.string().refine((val) => parseInt(val) > 0, {
    error: 'Price must be greater than 0',
  }),
  quantity: z.string().refine((val) => parseInt(val) > 0, {
    error: 'Quantity must be greater than 0',
  }),
  categoryId: z
    .string()
    .min(1, 'Category does not exist')
    .max(25, 'Category does not exist '),
});

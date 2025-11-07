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
    .min(1, 'Description is required')
    .max(500, 'Name should not be more than 500 characters.'),
  gender: z.enum(['MALE', 'FEMALE', 'BOTH'], {
    error: 'Gender must be male, female or both.',
  }),

  price: z.coerce.number().positive('Price must be greater than 0'),
  quantity: z.coerce.number().positive('Quantity must be greater than 0'),
  categoryId: z.string().trim().nonempty('Category is required'),
  colorId: z.string().trim().nonempty('Category is required'),
  variantTypeName: z.string().trim().optional(),
  productVariants: z
    .array(
      z.object({
        value: z.string().nonempty('Variant value is required'),
        price: z.coerce
          .number()
          .positive('Variant Price must be greater than 0'),
        quantity: z.coerce
          .number()
          .positive('Variant Quantity must be greater than 0'),
      })
    )
    .optional(),
  images: z
    .array(
      z.object({
        url: z.url().nonempty('Image url is required'),
        fileId: z.string().nonempty('File id is required'),
      })
    )
    .refine((data) => data.length > 0, {
      error: 'Include at least one image',
    }),
});

export const productUpdateSchema = productSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: 'At least one field must be provided to update',
  });

export type ProductSchema = z.infer<typeof productSchema>;
export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;

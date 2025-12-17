import z from 'zod';

export const productEditSchema = z.object({
  name: z.string().nonempty('Product name is required.').optional(),
  description: z
    .string()
    .trim()
    .nonempty('Description is required')
    .min(10, 'Description should be at least 10 characters.')
    .optional(),
  gender: z.enum(['MALE', 'FEMALE', 'BOTH']).optional(),
  categoryId: z.string().min(1, 'Category is required').optional(),
  colorId: z.string().min(1, 'Color is required').optional(),

  price: z.coerce.number().positive('Price must be greater than 0').optional(),
  quantity: z.coerce.number().int().optional(),
  variantTypeName: z.string().optional(),
  productVariants: z
    .array(
      z.object({
        id: z.string().nonempty('Variant id is required').optional(),
        value: z.string().nonempty('Value is required'),
        price: z.coerce.number().positive('Price must be greater than 0'),
        quantity: z.coerce.number().int().nonnegative().optional(),
      })
    )
    .optional(),

  images: z
    .array(
      z.object({
        url: z.string(),
        fileId: z.string(),
      })
    )
    .min(1, 'At least one image is required')
    .max(4, 'Maximum 4 images allowed')

    .optional(),
});

export type ProductEditSchema = z.infer<typeof productEditSchema>;

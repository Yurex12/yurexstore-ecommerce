import z from 'zod';
import { MAX_IMAGE_SIZE } from '../constants';

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
  quantity: z.coerce
    .number()
    .int()
    // .positive('Quantity must be greater than 0')
    .optional(),
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
      z.union([
        z.object({
          url: z.string(),
          fileId: z.string(),
        }),
        z.instanceof(File),
      ])
    )
    .min(1, 'At least one image is required')
    .max(4, 'Maximum 4 images allowed')
    .refine(
      (items) =>
        items.every((item) =>
          item instanceof File ? item.size <= MAX_IMAGE_SIZE : true
        ),
      {
        message: 'Each file should be less than 1MB',
      }
    )
    .optional(),
});

export type ProductEditSchema = z.infer<typeof productEditSchema>;

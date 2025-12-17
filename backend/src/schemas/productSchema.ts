import z from 'zod';

const variantsSchema = z.discriminatedUnion('hasVariants', [
  z.object({
    hasVariants: z.literal(false),
    price: z.coerce.number().positive('Price must be greater than 0'),
    quantity: z.coerce
      .number()
      .int()
      .positive('Quantity must be greater than 0'),
  }),

  z.object({
    hasVariants: z.literal(true),
    variantTypeName: z.string().nonempty('Variant type name is required'),
    productVariants: z
      .array(
        z.object({
          value: z.string().nonempty('Value is required'),
          price: z.coerce.number().positive('Price must be greater than 0'),
          quantity: z.coerce
            .number()
            .int()
            .positive('Quantity must be greater than 0'),
        })
      )
      .min(1, 'At least one variant is required'),
  }),
]);

export const productSchema = z
  .object({
    name: z.string().nonempty('Product name is required.'),
    description: z
      .string()
      .trim()
      .nonempty('Description is required')
      .min(10, 'Description should be at least 10 characters.'),
    gender: z.enum(['MALE', 'FEMALE', 'BOTH']),
    categoryId: z.string().min(1, 'Category is required'),
    colorId: z.string().min(1, 'Color is required'),
    images: z
      .array(
        z.object({
          url: z.string().url('Invalid image URL'),
          fileId: z.string().nonempty('File ID is required'),
        })
      )
      .min(1, 'At least one image is required')
      .max(4, 'Maximum 4 images allowed'),
  })
  .and(variantsSchema);

export const similarProductsSchema = z.object({
  productId: z.string(),
  categoryId: z.string(),
});

export type SimilarProductsSchema = z.infer<typeof similarProductsSchema>;

export type ProductSchema = z.input<typeof productSchema>;

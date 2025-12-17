import z from 'zod';

export const productsDeleteSchema = z.object({
  productIds: z.array(z.string().nonempty('Color Id is required')),
});

export const colorsDeleteSchema = z.object({
  colorIds: z.array(z.string().nonempty('Color Id is required')),
});

export const categoriesDeleteSchema = z.object({
  categoryIds: z.array(z.string().nonempty('Color Id is required')),
});

export type ProductsDeleteSchema = z.infer<typeof productsDeleteSchema>;
export type CategoriesDeleteSchema = z.infer<typeof categoriesDeleteSchema>;
export type ColorsDeleteSchema = z.infer<typeof colorsDeleteSchema>;

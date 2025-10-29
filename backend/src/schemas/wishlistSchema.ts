import z from 'zod';

export const wishlistSchema = z.object({
  productId: z.string().trim().nonempty('Wishlist Id is required'),
});

export type WishlistSchema = z.infer<typeof wishlistSchema>;

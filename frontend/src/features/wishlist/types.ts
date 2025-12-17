import type { Product } from '../product/types';

export type WishlistItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  userId: string;
  product: Product;
};

export type WishlistData = {
  message: string;
  success: boolean;
  wishlist: WishlistItem[];
};

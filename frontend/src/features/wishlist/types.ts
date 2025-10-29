type Image = {
  url: string;
  fileId: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: Image[];
};

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

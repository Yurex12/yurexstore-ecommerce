export type CartItem = {
  id: string;
  quantity: number;
  productId: string;
  userId: string;
  productVariantId: string | null;
};

export type productVariant = {
  id: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  value: string;
} | null;

type Category = {
  name: string;
};

type Image = {
  id: string;
  productId: string;
  url: string;
  fileId: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variantTypeName: string | null;
  images: Image[];
  category: Category;
};

export type CartWithRelation = CartItem & {
  product: Product;
  productVariant: productVariant | null;
};

export type CartItemRes = {
  success: boolean;
  message: string;
  cartItem: CartItem;
};

export type Cart = {
  success: boolean;
  message: string;
  cart: CartWithRelation[];
};

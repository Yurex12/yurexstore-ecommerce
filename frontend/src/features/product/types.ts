export type SortOption = {
  id: string;
  name: string;
};

export type Color = {
  id: string;
  name: string;
  ringValue: string;
};

type Images = {
  id: string;
  url: string;
  fileId: string;
};

type Review = {
  rating: number;
};

type productVariant = {
  id: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  quantity: number;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: Images[];
  gender: string;
  categoryId: string;
  category: { name: string };
  reviews: Review[];
  productVariant: productVariant[];
};

export type Products = {
  success: boolean;
  message: string;
  products: Product[];
};

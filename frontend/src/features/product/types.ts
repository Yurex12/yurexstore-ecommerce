import type { ApiResponseBase } from '@/services/types';

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
  gender: 'MALE' | 'FEMALE' | 'BOTH';
  categoryId: string;
  colorId: string;
  category: { name: string; id: string };
  reviews: Review[];
  productVariants: productVariant[];
  variantTypeName: string | null;
};

export type ProductVariantProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

export type ProductDeleteState = {
  isDeleteDialogOpen: boolean;
  selectedProductId: string;
  selectedProductIds: string[];
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSelectedProductId: (id: string) => void;
  setSelectedProductIds: (ids: string[]) => void;
};

export type GetProductsResponse = ApiResponseBase & {
  products: Product[];
};
export type GetProductResponse = ApiResponseBase & {
  product: Product;
};

export type ProductResponse = ApiResponseBase & {
  product: Product;
};

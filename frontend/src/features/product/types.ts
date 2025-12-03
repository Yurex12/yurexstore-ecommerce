import type { ApiResponseBase } from '@/services/types';

export type SortOption = {
  id: string;
  name: string;
};

export type Gender = 'MALE' | 'FEMALE' | 'BOTH';

export type Image = {
  id: string;
  url: string;
  fileId: string;
};

export type Category = {
  name: string;
};

export type ProductVariant = {
  id: string;
  price: number;
  quantity: number;
  value: string;
};

export type Color = {
  name: string;
  code: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: Image[];
  gender: Gender;
  categoryId: string;
  colorId: string;
  category: Category;
  avgRating: number;
  reviewCount: number;
  productVariants: ProductVariant[];
  variantTypeName: string | null;
};

export type AdminProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  gender: Gender;
  images: Image[];
};

export type ProductDetails = Product & { color: Color };

export type GetProductsResponse = ApiResponseBase & {
  products: Product[];
};

export type GetProductResponse = ApiResponseBase & {
  product: ProductDetails;
};

export type GetAdminProductsResponse = ApiResponseBase & {
  products: AdminProduct[];
};

export type ProductVariantProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

export type SimilarProductsQuery = {
  categoryId: string;
  productId: string;
};

export type ProductDeleteState = {
  isDeleteDialogOpen: boolean;
  selectedProductId: string;
  selectedProductIds: string[];
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSelectedProductId: (id: string) => void;
  setSelectedProductIds: (ids: string[]) => void;
};

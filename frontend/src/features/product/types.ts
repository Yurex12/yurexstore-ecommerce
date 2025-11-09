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
  productVariants: productVariant[];
  variantTypeName: string | null;
};

export type ProductListResponse = {
  success: boolean;
  message: string;
  products: Product[];
};

export type ProductVariantProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

export type ProductDeleteState = {
  isDeleteDialogOpen: boolean;
  selectedProductId: string;
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSelectedProductId: (id: string) => void;
};

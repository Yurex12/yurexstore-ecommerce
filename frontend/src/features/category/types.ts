import type { ApiResponseBase } from '@/services/types';

export type CategoryDeleteState = {
  isDeleteDialogOpen: boolean;
  selectedColorId: string;
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSelectedColorId: (id: string) => void;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  fileId: string;
};

export type GetCategoriesResponse = ApiResponseBase & {
  categories: Category[];
};
export type CategoryResponse = ApiResponseBase & {
  category: Category;
};

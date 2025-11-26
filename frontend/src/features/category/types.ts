import type { ApiResponseBase } from '@/services/types';

export type CategoryDeleteState = {
  isDeleteDialogOpen: boolean;
  selectedCategoryId: string;
  selectedCategoryIds: string[];
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSelectedCategoryId: (id: string) => void;
  setSelectedCategoryIds: (ids: string[]) => void;
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

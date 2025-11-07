import type { ApiResponseBase } from '@/services/types';

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
};

export type GetCategoriesResponse = ApiResponseBase & {
  categories: Category[];
};
export type CategoryResponse = ApiResponseBase & {
  category: Category;
};

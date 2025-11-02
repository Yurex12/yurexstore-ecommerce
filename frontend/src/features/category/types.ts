import type { ApiResponseBase } from '@/services/types';

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
};

export type CategoryListResponse = ApiResponseBase & {
  categories: Category[];
};

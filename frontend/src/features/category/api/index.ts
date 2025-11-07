import { api, handleApiError } from '@/services/api';
import type { CategoryResponse, GetCategoriesResponse } from '../types';
import type { ApiResponseBase } from '@/services/types';

export async function getCategories() {
  try {
    const { data } = await api.get<GetCategoriesResponse>('/categories');
    return data.categories;
  } catch (error) {
    handleApiError(error, 'Failed to fetch categories');
  }
}

export async function createCategory(categoryData: {
  name: string;
  image: string;
  description: string;
}) {
  try {
    const { data } = await api.post<CategoryResponse>(
      '/categories',
      categoryData
    );
    return data.category;
  } catch (error) {
    handleApiError(error, 'Failed to create category');
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const { data } = await api.delete<ApiResponseBase>(
      `/categories/${categoryId}`
    );
    return data;
  } catch (error) {
    handleApiError(error, 'Failed to create category');
  }
}

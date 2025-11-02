import { api, handleApiError } from '@/services/api';
import type { CategoryListResponse } from '../types';

export async function getCategories() {
  try {
    const { data } = await api.get<CategoryListResponse>('/categories');
    return data.categories;
  } catch (error) {
    handleApiError(error, 'Failed to fetch categories');
  }
}

import { api, handleApiError } from '@/services/api';
import type { Categories } from '../types';

export async function getCategories() {
  try {
    const { data } = await api.get<Categories>('/categories');
    return data.categories;
  } catch (error) {
    handleApiError(error, 'Failed to fetch categories');
  }
}

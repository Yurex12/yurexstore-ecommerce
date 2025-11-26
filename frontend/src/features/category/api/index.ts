import { api, handleApiError } from '@/services/api';
import type {
  Category,
  CategoryResponse,
  GetCategoriesResponse,
} from '../types';
import type { ApiResponseBase } from '@/services/types';

export async function getCategories() {
  try {
    const { data } = await api.get<GetCategoriesResponse>('/categories');
    return data.categories;
  } catch (error) {
    handleApiError(error, 'Failed to fetch categories');
  }
}

export async function createCategory(
  categoryData: Omit<Category, 'slug' | 'id'>
) {
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

export async function updateCategory({
  categoryData,
  categoryId,
}: {
  categoryData: Partial<Omit<Category, 'slug' | 'id'>>;
  categoryId: string;
}) {
  try {
    console.log(categoryData);

    const { data } = await api.patch<CategoryResponse>(
      `/categories/${categoryId}`,
      categoryData
    );
    return data.category;
  } catch (error) {
    handleApiError(error, 'Failed to update category');
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

export async function deleteCategories(categoryIds: string[]) {
  try {
    const { data } = await api.delete<ApiResponseBase>(`/admin/categories`, {
      data: {
        categoryIds,
      },
    });

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete categories');
  }
}

import { api, handleApiError } from '@/services/api';

import type { ProductListResponse } from '../types';

export async function getProducts() {
  try {
    const { data } = await api.get<ProductListResponse>('/products');

    return data.products;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { data } = await api.delete(`/products/${productId}`);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete');
  }
}

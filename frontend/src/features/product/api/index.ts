import { api, handleApiError } from '@/services/api';

import type { Products } from '../types';

export async function getProducts() {
  try {
    const { data } = await api.get<Products>('/products');

    return data.products;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

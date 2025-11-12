import { api, handleApiError } from '@/services/api';

import type { GetProductsResponse, ProductResponse } from '../types';
import type { ProductSchema } from '../schemas/productSchema';

export async function getProducts() {
  try {
    const { data } = await api.get<GetProductsResponse>('/products');

    return data.products;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

export async function createProduct(
  productData: Omit<ProductSchema, 'images'> & {
    images: { url: string; fileId: string }[];
  }
) {
  try {
    const { data } = await api.post<ProductResponse>('/products', productData);

    return data.product;
  } catch (error) {
    handleApiError(error, 'Failed to create products');
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

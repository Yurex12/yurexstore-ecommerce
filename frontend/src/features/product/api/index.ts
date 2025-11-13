import { api, handleApiError } from '@/services/api';

import type {
  GetProductResponse,
  GetProductsResponse,
  ProductResponse,
} from '../types';
import type { ProductCreateSchema } from '../schemas/productCreateSchema';
import type { ProductEditSchema } from '../schemas/productEditSchema';

export async function getProducts() {
  try {
    const { data } = await api.get<GetProductsResponse>('/products');

    return data.products;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

export async function getProduct(productId: string) {
  try {
    const { data } = await api.get<GetProductResponse>(
      `/products/${productId}`
    );

    return data.product;
  } catch (error) {
    handleApiError(error, 'Failed to fetch product');
  }
}

export async function createProduct(
  productData: Omit<ProductCreateSchema, 'images'> & {
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

export async function updateProduct({
  productData,
  productId,
}: {
  productData: Omit<ProductEditSchema, 'images'> & {
    images: { url: string; fileId: string }[];
  };
  productId: string;
}) {
  try {
    const { data } = await api.patch<ProductResponse>(
      `/products/${productId}`,
      productData
    );

    return data.product;
  } catch (error) {
    handleApiError(error, 'Failed to edit products');
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

import { api, handleApiError } from '@/services/api';

import type { ApiResponseBase } from '@/services/types';
import type { ProductCreateSchema } from '../schemas/productCreateSchema';
import type { ProductEditSchema } from '../schemas/productEditSchema';
import type {
  GetAdminProductsResponse,
  GetProductResponse,
  GetProductsResponse,
  GetSearchProductsResponse,
  SimilarProductsQuery,
} from '../types';

interface ProductFilters {
  category?: string;
  color?: string;
  gender?: string;
  sort?: string;
  page?: number;
  q?: string;
}

export async function getProducts(filters: ProductFilters) {
  const params = new URLSearchParams();

  if (filters?.category) params.append('categorySlug', filters.category);
  if (filters?.color) params.append('colorName', filters.color);
  if (filters?.gender) params.append('gender', filters.gender);
  if (filters?.sort) params.append('sortOption', filters.sort);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.q) params.append('q', filters.q.toString());

  const queryString = params.toString();

  const url = queryString ? `/products?${queryString}` : '/products';

  try {
    const { data } = await api.get<GetProductsResponse>(url);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

export async function getSearchProducts(query: string) {
  const params = new URLSearchParams();

  if (query) params.append('q', query);

  const url = `/products/search?${params.toString()}`;

  try {
    const { data } = await api.get<GetSearchProductsResponse>(url);

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

export async function getAdminProducts() {
  try {
    const { data } = await api.get<GetAdminProductsResponse>(`/admin/products`);

    return data.products;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

export async function getSimilarProducts(productData: SimilarProductsQuery) {
  try {
    const { data } = await api.get<GetProductsResponse>(
      '/products/similar-products',
      {
        params: productData,
      }
    );

    return data.products;
  } catch (error) {
    handleApiError(error, 'Failed to fetch products');
  }
}

export async function createProduct(
  productData: Omit<ProductCreateSchema, 'images'> & {
    images: { url: string; fileId: string }[];
  }
) {
  try {
    const { data } = await api.post<ApiResponseBase>('/products', productData);

    return data;
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
    const { data } = await api.patch<ApiResponseBase>(
      `/products/${productId}`,
      productData
    );

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to edit products');
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { data } = await api.delete(`/products/${productId}`);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete product');
  }
}
export async function deleteProducts(productIds: string[]) {
  try {
    const { data } = await api.delete(`/admin/products`, {
      data: {
        productIds,
      },
    });

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete Product(s)');
  }
}

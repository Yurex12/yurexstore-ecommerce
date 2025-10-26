import type { AxiosError } from 'axios';

import { api } from '@/services/api';

import type { ApiError } from '@/services/types';
import type { Products } from '../types';

export async function getProducts() {
  try {
    const res = await api.get<Products>('/products');

    if (!res.data) {
      throw new Error('Could not fetch products');
    }

    return res.data.data.products;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    throw new Error('Could not fetch products');
  }
}

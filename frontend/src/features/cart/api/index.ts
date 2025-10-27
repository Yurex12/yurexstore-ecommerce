import type { AxiosError } from 'axios';

import { api } from '@/services/api';

import type { ApiError } from '@/services/types';
import type { CartRes } from '../types';

export async function getCart() {
  try {
    const res = await api.get<CartRes>('/cart');

    if (!res.data) {
      throw new Error('Could not fetch cart');
    }

    return res.data.data.cart;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not fetch cart');
  }
}

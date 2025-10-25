import type { AxiosError } from 'axios';

import { api } from '@/services/api';

import type { ApiError } from '@/services/types';
import type { Categories } from '../types';

export async function getCategories() {
  try {
    const res = await api.get<Categories>('/categories');

    if (!res.data) {
      throw new Error('Could not fetch categories');
    }

    return res.data.data.categories;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    const msg = err.response?.data?.message || 'Could not fetch Categories';
    throw new Error(msg);
  }
}

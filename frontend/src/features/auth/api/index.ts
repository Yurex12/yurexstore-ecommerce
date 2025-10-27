import type { AxiosError } from 'axios';

import { api } from '@/services/api';

import type { ApiError } from '@/services/types';
import type { SignInSchema } from '../schemas/signInSchema';
import type { UserRes } from '../types';

export async function signInUser({
  email,
  password,
}: Omit<SignInSchema, 'rememberMe'>) {
  try {
    const res = await api.post<UserRes>('/auth/login', {
      email,
      password,
    });

    if (!res.data) {
      throw new Error('Something went wrong, try again');
    }

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Failed to login');
  }
}

export async function signOut() {
  try {
    const res = await api.post('/auth/logout');

    if (!res.data) {
      throw new Error('Something went wrong, try again');
    }

    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Failed to logout');
  }
}

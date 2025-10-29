import { api, handleApiError } from '@/services/api';

import type { SignInSchema } from '../schemas/signInSchema';
import type { UserRes } from '../types';

export async function signInUser({
  email,
  password,
}: Omit<SignInSchema, 'rememberMe'>) {
  try {
    const { data } = await api.post<UserRes>('/auth/login', {
      email,
      password,
    });

    return data.user;
  } catch (error) {
    handleApiError(error, 'Failed to login');
  }
}

export async function signOut() {
  try {
    const { data } = await api.post('/auth/logout');

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to logout');
  }
}

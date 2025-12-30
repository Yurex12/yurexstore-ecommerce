import { api, handleApiError } from '@/services/api';

import type { SignInSchema } from '../schemas/signInSchema';
import type { UserData, UsersData } from '../types';

export async function signInUser({
  email,
  password,
}: Omit<SignInSchema, 'rememberMe'>) {
  try {
    const { data } = await api.post<UserData>(
      '/auth/login',
      {
        email,
        password,
      },
      {
        skipAuthInterceptor: true,
      }
    );

    return data.user;
  } catch (error) {
    handleApiError(error, 'Failed to login');
  }
}

export async function loginWithGoogle(tokenId: string) {
  try {
    const { data } = await api.post<UserData>('/auth/google-login', {
      tokenId,
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

export async function getUserData() {
  try {
    const { data } = await api.get<UserData>('/auth/user');

    return data.user;
  } catch (error) {
    handleApiError(error, 'Failed to fetch user data');
  }
}

export async function getUsersData() {
  try {
    const { data } = await api.get<UsersData>('/admin/users');

    return data.users;
  } catch (error) {
    handleApiError(error, 'Failed to fetch users data');
  }
}
export async function updatePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  try {
    const { data } = await api.patch('/auth/update-password', {
      oldPassword,
      newPassword,
    });

    return data;
  } catch (error) {
    console.log(error);

    handleApiError(error, 'Failed to update password');
  }
}

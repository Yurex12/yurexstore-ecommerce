import axios, { AxiosError } from 'axios';
import type { ApiResponseBase } from './types';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthInterceptor?: boolean;
  }
}

export const api = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'http://192.168.0.3:8080/api',
  // baseURL: 'http://192.168.0.3:8080/api',
  // baseURL: 'http://172.20.10.2:8080/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const err = error as AxiosError<ApiResponseBase>;

    const skipInterceptor = err.config?.skipAuthInterceptor;

    if (err.response?.status === 401 && !skipInterceptor) {
      localStorage.removeItem('isLoggedIn');

      const message = 'Your session has expired. Please log in again.';

      err.message = message;

      if (err.response.data) {
        err.response.data.message = message;
      }
    }

    return Promise.reject(err);
  }
);

export function handleApiError(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiResponseBase>;
    let message = err.response?.data.message;
    console.log(err.response?.status);

    if (err.response?.status === 500) {
      console.log(err.response.data.message);
      message = 'Something went wrong';
    }

    if (err.code === 'ERR_NETWORK') {
      message = 'Network error. Please check your connection.';
    }

    throw new Error(message || fallbackMessage);
  }

  throw new Error('Unexpected error');
}

import axios, { AxiosError } from 'axios';
import type { ApiResponseBase } from './types';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: 'http://192.168.0.2:8080/api',
  withCredentials: true,
});

export function handleApiError(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiResponseBase>;
    let message = err.response?.data.message;

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

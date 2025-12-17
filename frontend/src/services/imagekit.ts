import { api, handleApiError } from './api';
import type { ImagekitResponse } from './types';

export async function getImagekitAuthParams() {
  try {
    const res = await api.get<ImagekitResponse>('/imagekit/auth');

    return res.data;
  } catch (error) {
    handleApiError(error, 'Failed to get ImageKit auth parameters');
  }
}

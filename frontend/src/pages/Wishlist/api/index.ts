import { api, handleApiError } from '@/services/api';

export async function getWishlist() {
  try {
    const { data } = await api.get('/wishlist');

    return data.wishlists;
  } catch (error) {
    handleApiError(error, 'Failed to fetch wishlist');
  }
}

export async function addToWishlist(productId: string) {
  try {
    const { data } = await api.post('/wishlist', { productId });

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to add item ro wishlist');
  }
}

export async function removeFromWishlist(wishlistItemId: string) {
  try {
    const { data } = await api.delete(`/wishlist/${wishlistItemId}`);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to remove item from wishlist');
  }
}

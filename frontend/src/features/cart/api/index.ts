import { api, handleApiError } from '@/services/api';

import type { Cart, CartItemRes } from '../types';

export async function getCart() {
  try {
    const { data } = await api.get<Cart>(`/cart`);

    return data.cart;
  } catch (error) {
    handleApiError(error, 'Failed to fetch cart');
  }
}

export async function addToCart(cartData: {
  productId: string;
  productVariantId?: string;
}) {
  const payload: { productId: string; productVariantId?: string } = {
    productId: cartData.productId,
  };

  if (cartData.productVariantId) {
    payload.productVariantId = cartData.productVariantId;
  }

  console.log(payload);

  try {
    const { data } = await api.post<CartItemRes>('/cart', payload);

    return data.cartItem;
  } catch (error) {
    handleApiError(error, 'Failed to add product to cart');
  }
}

export async function incrementCartItem(cartItemId: string) {
  try {
    const { data } = await api.patch<CartItemRes>(
      `/cart/increment/${cartItemId}`
    );

    return data.cartItem;
  } catch (error) {
    handleApiError(error, 'Failed to reduce product quantity');
  }
}

export async function decrementCartItem(cartItemId: string) {
  try {
    const { data } = await api.patch<CartItemRes>(
      `/cart/decrement/${cartItemId}`
    );

    return data.cartItem;
  } catch (error) {
    handleApiError(error, 'Failed to reduce product quantity');
  }
}

export async function removeItemFromCart(cartItemId: string) {
  try {
    const { data } = await api.delete<CartItemRes>(`/cart/${cartItemId}`);

    return data.cartItem;
  } catch (error) {
    handleApiError(error, 'Failed to clear cart');
  }
}

export async function clearCart() {
  try {
    const { data } = await api.delete<CartItemRes>(`/cart`);

    return data.cartItem;
  } catch (error) {
    handleApiError(error, 'Failed to clear cart');
  }
}

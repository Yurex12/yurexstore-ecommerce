import type { AxiosError } from 'axios';

import { api } from '@/services/api';

import type { ApiError } from '@/services/types';
import type { Cart, CartItemRes } from '../types';

export async function getCart() {
  try {
    const res = await api.get<Cart>(`/cart`);

    if (!res.data) {
      throw new Error('Could not fetch cart');
    }

    return res.data.cart;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not fetch cart');
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

  try {
    const res = await api.post<CartItemRes>('/cart', payload);

    if (!res.data) {
      throw new Error('Could not add product to cart');
    }

    return res.data.cartItem;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not add product to cart');
  }
}

export async function incrementCartItem(cartItemId: string) {
  try {
    const res = await api.patch<CartItemRes>(`/cart/increment/${cartItemId}`);

    if (!res.data) {
      throw new Error('Could not increase product quantity');
    }

    return res.data.cartItem;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not increase product quantity');
  }
}

export async function decrementCartItem(cartItemId: string) {
  try {
    const res = await api.patch<CartItemRes>(`/cart/decrement/${cartItemId}`);

    if (!res.data) {
      throw new Error('Could not remove product from cart');
    }

    return res.data.cartItem;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not remove product from cart');
  }
}

export async function removeItemFromCart(cartItemId: string) {
  try {
    const res = await api.delete<CartItemRes>(`/cart/${cartItemId}`);

    if (!res.data) {
      throw new Error('Could not remove product from cart');
    }

    return res.data.cartItem;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not remove product from cart');
  }
}

export async function clearCart() {
  try {
    const res = await api.delete<CartItemRes>(`/cart`);

    if (!res.data) {
      throw new Error('Could not clear cart');
    }

    return res.data.cartItem;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    console.log(err.response?.data.message);

    let message = err.response?.data.message;

    if (err.response?.status === 500) {
      message = 'Something went wrong';
    }

    throw new Error(message || 'Could not clear cart');
  }
}

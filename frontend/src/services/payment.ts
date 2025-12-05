import type { CreateOrderInput } from '@/features/order/types';
import { api, handleApiError } from './api';
import type { ApiResponseBase } from './types';

export async function createPaymentIntent(orderData: CreateOrderInput) {
  try {
    const { data } = await api.post<
      ApiResponseBase & { clientSecret: string; paymentIntentId: string }
    >('/payment/create-payment-intent', orderData);

    return data;
  } catch (error) {
    handleApiError(error, 'Something went wrong');
  }
}

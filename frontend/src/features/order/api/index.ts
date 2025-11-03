import { api, handleApiError } from '@/services/api';

import type {
  CreateOrderResponse,
  OrderData,
  OrderResponse,
  OrdersResponse,
} from '../types';

export async function getOrders() {
  try {
    const { data } = await api.get<OrdersResponse>(`/orders`);

    return data.orders;
  } catch (error) {
    handleApiError(error, 'Failed to fetch orders');
  }
}
export async function getOrder(orderId: string) {
  try {
    const { data } = await api.get<OrderResponse>(`/orders/${orderId}`);

    return data.order;
  } catch (error) {
    handleApiError(error, 'Failed to fetch order');
  }
}

export async function createOrder(orderData: OrderData) {
  try {
    const { data } = await api.post<CreateOrderResponse>('/orders', orderData);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to create order');
  }
}

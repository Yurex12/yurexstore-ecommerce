import { api, handleApiError } from '@/services/api';

import type {
  AdminOrderResponse,
  AdminOrdersResponse,
  CreateOrderResponse,
  CreateOrderInput,
  OrderResponse,
  OrdersResponse,
} from '../types';
import type { ApiResponseBase } from '@/services/types';

export async function getOrders() {
  try {
    const { data } = await api.get<OrdersResponse>(`/orders`);

    return data.orders;
  } catch (error) {
    handleApiError(error, 'Failed to fetch orders');
  }
}

export async function getAdminOrders() {
  try {
    const { data } = await api.get<AdminOrdersResponse>(`/admin/orders`);

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

export async function getAdminOrder(orderId: string) {
  try {
    const { data } = await api.get<AdminOrderResponse>(
      `admin/orders/${orderId}`
    );

    return data.order;
  } catch (error) {
    handleApiError(error, 'Failed to fetch order');
  }
}

export async function createOrder(orderData: CreateOrderInput) {
  const { data } = await api.post<CreateOrderResponse>('/orders', orderData);
  return data.orderId;
}

export async function cancelOrder(orderId: string) {
  try {
    const { data } = await api.patch<
      ApiResponseBase & {
        orderId: string;
      }
    >(`admin/orders/${orderId}/cancel`);
    return data;
  } catch (error) {
    handleApiError(error, 'Failed to cancel order');
  }
}

export async function completeOrder(orderId: string) {
  try {
    const { data } = await api.patch<
      ApiResponseBase & {
        orderId: string;
      }
    >(`admin/orders/${orderId}/complete`);
    return data;
  } catch (error) {
    handleApiError(error, 'Failed to complete order');
  }
}

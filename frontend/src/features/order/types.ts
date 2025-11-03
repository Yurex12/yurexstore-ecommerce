import type { ApiResponseBase } from '@/services/types';

type OrderItemData = {
  productId: string;
  productVariantId: string | null;
  quantity: number;
};

export type PaymentInfoProps = {
  paymentMethod: string;
  deliveryFee: number;
  totalPrice: number;
};

export type OrderStatus = 'PENDING' | 'CANCELLED' | 'DELIVERED';

export type OrderData = {
  deliveryAddress: string;
  phone: string;
  paymentMethod: 'CASH_ON_DELIVERY' | 'STRIPE';
  orderItems: OrderItemData[];
};

export type OrderItem = {
  id: string;
  productId: string;
  productVariantId: string | null;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
  orderId: string;
};

export type CreateOrderResponse = ApiResponseBase & {
  orderId: string;
};

export type Order = {
  id: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  userId: string;
  deliveryAddress: string;
  phone: string;
  paymentMethod: 'CASH_ON_DELIVERY' | 'STRIPE';
  deliveryFee: number;
  orderItems: OrderItem[];
  updatedAt: Date;
  createdAt: Date;
};

export type OrderResponse = ApiResponseBase & {
  order: Order;
};

export type OrdersResponse = ApiResponseBase & {
  orders: Order[];
};

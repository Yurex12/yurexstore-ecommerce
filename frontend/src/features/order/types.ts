import type { ApiResponseBase } from '@/services/types';

export type PaymentMethod = 'CASH_ON_DELIVERY' | 'STRIPE';
export type OrderStatus = 'PENDING' | 'CANCELLED' | 'DELIVERED';
export type PaymentStatus = 'PENDING' | 'CONFIRMED';

export type OrderItem = {
  id: string;
  productId: string;
  productVariantId: string | null;
  productVariantValue: string | null;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
  orderId: string;
};

export type Order = {
  id: string;
  orderNumber: number;

  userId: string;

  deliveryAddress: string;
  phone: string;

  totalPrice: number;
  deliveryFee: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  orderStatus: OrderStatus;

  orderItems: OrderItem[];

  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrderItemInput = {
  productId: string;
  productVariantId: string | null;
  quantity: number;
};

export type CreateOrderInput = {
  deliveryAddress: string;
  phone: string;
  paymentMethod: PaymentMethod;
  orderItems: CreateOrderItemInput[];
};

export type OrderResponse = ApiResponseBase & {
  order: Order;
};

export type OrdersResponse = ApiResponseBase & {
  orders: Order[];
};

export type CreateOrderResponse = ApiResponseBase & {
  orderId: string;
};

export type GetOrderStatusResponse = ApiResponseBase & {
  orderId: string | null;
  status: 'PROCESSING' | 'CONFIRMED';
};

export type AdminOrderDetails = Order & {
  user: { name: string };
};

export type AdminOrdersResponse = ApiResponseBase & {
  orders: {
    id: string;
    orderStatus: OrderStatus;
    orderNumber: number;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    user: {
      name: string;
    };
  }[];
};

export type AdminOrder = {
  id: string;
  orderStatus: OrderStatus;
  orderNumber: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  user: {
    name: string;
  };
};

export type AdminOrderResponse = ApiResponseBase & {
  order: AdminOrderDetails;
};

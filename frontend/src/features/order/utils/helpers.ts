import type { Order } from '../types';

export function getStatusColor(status: Order['orderStatus']) {
  switch (status) {
    case 'PENDING':
      return 'text-orange-600 bg-orange-100';
    case 'DELIVERED':
      return 'text-green-600 bg-green-100';
    case 'CANCELLED':
      return 'text-red-600 bg-red-100';
    default:
      return '';
  }
}

export function getPaymentColor(payment: Order['paymentStatus']) {
  switch (payment) {
    case 'CONFIRMED':
      return 'text-green-600 bg-green-100';
    case 'PENDING':
      return 'text-red-600 bg-red-100';
    default:
      return '';
  }
}

import type { Order } from '../types';

export function getStatusColor(status: Order['orderStatus']) {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-100';
    case 'DELIVERED':
      return 'text-green-600 bg-green-100';
    case 'CANCELLED':
      return 'text-red-600 bg-red-100';
  }
}

export function getPaymentColor(payment: Order['paymentStatus']) {
  switch (payment) {
    case 'CONFIRMED':
      return 'text-green-600 bg-green-100';
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-100';
  }
}

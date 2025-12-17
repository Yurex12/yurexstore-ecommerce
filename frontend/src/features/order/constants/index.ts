import type { OrderStatus } from '../types';

export const orderStatuses: { label: string; status: 'ALL' | OrderStatus }[] = [
  { label: 'All', status: 'ALL' },
  { label: 'Pending', status: 'PENDING' },
  { label: 'Delivered', status: 'DELIVERED' },
  { label: 'Cancelled', status: 'CANCELLED' },
];

import type { ApiResponseBase } from '@/services/types';

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  deliveryAddress: string;
  city: string;
  state: string;
  phone: string;
  default: boolean;
  userId: string;
};

export type GetAddressResponse = ApiResponseBase & {
  address: Address;
};
export type GetAddressesResponse = ApiResponseBase & {
  addresses: Address[];
};
export type CreateAddressResponse = {
  success: boolean;
  message: string;
  address: Address;
};
export type UpdateAddressResponse = {
  success: boolean;
  message: string;
  address: Address;
};

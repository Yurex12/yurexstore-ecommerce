import { api, handleApiError } from '@/services/api';
import type {
  Address,
  CreateAddressResponse,
  GetAddressResponse,
} from '../types';

export async function getAddresses() {
  try {
    const { data } = await api.get<GetAddressResponse>('/addresses');

    return data.addresses;
  } catch (error) {
    handleApiError(error, 'Failed to fetch address');
  }
}

export async function createAddress(
  addressData: Omit<Address, 'id' | 'userId'>
) {
  try {
    const { data } = await api.post<CreateAddressResponse>(
      '/addresses',
      addressData
    );

    return data.address;
  } catch (error) {
    handleApiError(error, 'Failed to create address');
  }
}

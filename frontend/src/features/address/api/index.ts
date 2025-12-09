import { api, handleApiError } from '@/services/api';
import type { ApiResponseBase } from '@/services/types';
import type {
  CreateAddressSchema,
  UpdateAddressSchema,
} from '../schemas/addressSchema';
import type {
  CreateAddressResponse,
  GetAddressesResponse,
  GetAddressResponse,
} from '../types';

export async function getAddresses() {
  try {
    const { data } = await api.get<GetAddressesResponse>('/addresses');

    return data.addresses;
  } catch (error) {
    handleApiError(error, 'Failed to fetch addresses');
  }
}
export async function getAddress(addressId: string) {
  try {
    const { data } = await api.get<GetAddressResponse>(
      `/addresses/${addressId}`
    );

    return data.address;
  } catch (error) {
    handleApiError(error, 'Failed to fetch address');
  }
}

export async function deleteAddress(addressId: string) {
  try {
    const { data } = await api.delete<ApiResponseBase>(
      `/addresses/${addressId}`
    );

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete address');
  }
}

export async function changeDefaultAddress(addressId: string) {
  try {
    const { data } = await api.patch<ApiResponseBase>(
      `/addresses/${addressId}`
    );

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to set as default address');
  }
}

export async function createAddress(addressData: CreateAddressSchema) {
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

export async function updateAddress({
  addressData,
  addressId,
}: {
  addressData: UpdateAddressSchema;
  addressId: string;
}) {
  try {
    const { data } = await api.put<CreateAddressResponse>(
      `/addresses/${addressId}`,
      addressData
    );

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to create address');
  }
}

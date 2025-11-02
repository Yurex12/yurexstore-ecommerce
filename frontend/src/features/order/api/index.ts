import { api, handleApiError } from '@/services/api';

// export async function getAddresses() {
//   try {
//     const { data } = await api.get<GetAddressResponse>('/addresses');

//     return data.addresses;
//   } catch (error) {
//     handleApiError(error, 'Failed to fetch address');
//   }
// }

export async function createOrder(orderData) {
  try {
    const { data } = await api.post('/orders', orderData);

    console.log(data);

    return data.address;
  } catch (error) {
    handleApiError(error, 'Failed to create order');
  }
}

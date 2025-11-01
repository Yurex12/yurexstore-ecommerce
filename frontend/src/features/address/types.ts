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

export type GetAddressResponse = {
  success: boolean;
  message: string;
  addresses: Address[];
};
export type CreateAddressResponse = {
  success: boolean;
  message: string;
  address: Address;
};

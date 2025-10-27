export type CartItem = {
  id: string;
};

export type CartItemRes = {
  success: boolean;
  message: string;
  cartItem: CartItem;
};

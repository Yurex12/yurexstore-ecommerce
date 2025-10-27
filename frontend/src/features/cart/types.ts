export type Cart = {
  id: string;
};

export type CartRes = {
  success: boolean;
  message: string;
  data: {
    cart: Cart;
  };
};

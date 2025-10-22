import { create } from 'zustand';

import { orderStatus } from '../constants';

type OrderState = {
  value: string;
  onChange: (value: string) => void;
};
export const useOrderStore = create<OrderState>((set) => ({
  value: orderStatus[0].value,
  onChange: (value: string) => set({ value }),
}));

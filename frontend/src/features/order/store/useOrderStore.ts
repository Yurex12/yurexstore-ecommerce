import { create } from 'zustand';

type OrderState = {
  status: string;
  onChange: (status: string) => void;
};
export const useOrderStore = create<OrderState>((set) => ({
  status: 'ALL',
  onChange: (status: string) => set({ status }),
}));

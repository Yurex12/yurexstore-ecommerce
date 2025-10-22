import { create } from 'zustand';

type AccountState = {
  open: boolean;
  handleOpen: VoidFunction;
};

export const useAccountStore = create<AccountState>((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
}));

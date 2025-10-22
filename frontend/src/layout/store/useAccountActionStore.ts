import { create } from 'zustand';

interface AccountActionsState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: VoidFunction;
}

export const useAccountStore = create<AccountActionsState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));

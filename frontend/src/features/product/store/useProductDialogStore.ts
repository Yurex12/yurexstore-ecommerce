import { create } from 'zustand';

type ProductDialogState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: VoidFunction;
};

export const useProductDialogStore = create<ProductDialogState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));

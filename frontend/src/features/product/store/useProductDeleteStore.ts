import { create } from 'zustand';
import type { ProductDeleteState } from '../types';

export const useProductDeleteStore = create<ProductDeleteState>((set) => ({
  isDeleteDialogOpen: false,
  selectedProductId: '',
  selectedProductIds: [],
  setDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),
  setSelectedProductId: (id) => set({ selectedProductId: id }),
  setSelectedProductIds: (ids) => set({ selectedProductIds: ids }),
}));

import { create } from 'zustand';
import type { CategoryDeleteState } from '../types';

export const useCategoryDeleteStore = create<CategoryDeleteState>((set) => ({
  isDeleteDialogOpen: false,
  selectedColorId: '',
  setDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),
  setSelectedColorId: (id) => set({ selectedColorId: id }),
}));

import { create } from 'zustand';
import type { CategoryDeleteState } from '../types';

export const useCategoryDeleteStore = create<CategoryDeleteState>((set) => ({
  isDeleteDialogOpen: false,
  selectedCategoryId: '',
  selectedCategoryIds: [],
  setDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }),
}));

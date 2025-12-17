import { create } from 'zustand';
import type { ColorDeleteState } from '../types';

export const useColorDeleteStore = create<ColorDeleteState>((set) => ({
  isDeleteDialogOpen: false,
  selectedColorId: '',
  selectedColorIds: [],
  setDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),
  setSelectedColorId: (id) => set({ selectedColorId: id }),
  setSelectedColorIds: (ids) => set({ selectedColorIds: ids }),
}));

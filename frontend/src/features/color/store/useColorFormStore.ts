import { create } from 'zustand';
import type { ColorFormState } from '../types';

export const useColorFormStore = create<ColorFormState>((set) => ({
  isFormOpen: false,
  editingColor: null,
  setFormOpen: (isOpen) => set({ isFormOpen: isOpen }),
  setEditingColor: (color) => set({ editingColor: color }),
}));

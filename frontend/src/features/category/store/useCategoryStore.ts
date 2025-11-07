import { create } from 'zustand';
import type { Category } from '../types';

type CategoryState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editingCategory: Category | null;
  setEditingCategory: (category: Category | null) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  open: false,
  editingCategory: null,
  setOpen: (open) => set({ open }),
  setEditingCategory: (category) => set({ editingCategory: category }),
}));

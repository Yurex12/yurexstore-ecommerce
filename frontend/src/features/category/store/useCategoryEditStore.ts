import { create } from 'zustand';
import type { Category } from '../types';

type CategoryFormState = {
  isFormOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
  editingCategory: Category | null;
  setEditingCategory: (category: Category | null) => void;
};

export const useCategoryEditStore = create<CategoryFormState>((set) => ({
  isFormOpen: false,
  editingCategory: null,
  setFormOpen: (isOpen) => set({ isFormOpen: isOpen }),
  setEditingCategory: (category) => set({ editingCategory: category }),
}));

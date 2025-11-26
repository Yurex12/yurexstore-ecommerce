import type { ApiResponseBase } from '@/services/types';

export type Color = {
  id: string;
  name: string;
  code: string;
};

export type ColorDeleteState = {
  isDeleteDialogOpen: boolean;
  selectedColorId: string;
  selectedColorIds: string[];
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSelectedColorId: (id: string) => void;
  setSelectedColorIds: (ids: string[]) => void;
};

export type ColorFormState = {
  isFormOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
  editingColor: Color | null;
  setEditingColor: (color: Color | null) => void;
};

export type GetColorsResponse = ApiResponseBase & {
  colors: Color[];
};
export type ColorResponse = ApiResponseBase & {
  color: Color;
};

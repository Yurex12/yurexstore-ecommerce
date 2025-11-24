// ColorActionsCell.tsx
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Color } from '../types';
import { useColorDeleteStore } from '../store/useColorDeleteStore';
import { useColorFormStore } from '../store/useColorFormStore';

export function ColorActionsCell({ color }: { color: Color }) {
  const { setSelectedColorId, setDeleteDialogOpen } = useColorDeleteStore();
  const { setEditingColor, setFormOpen } = useColorFormStore();

  function handleDelete(colorId: string) {
    setDeleteDialogOpen(true);
    setSelectedColorId(colorId);
  }

  function handleEdit(color: Color) {
    setFormOpen(true);
    setEditingColor(color);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className='text-2xl' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleEdit(color)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(color.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

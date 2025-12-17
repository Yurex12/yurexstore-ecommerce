import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { useColorDeleteStore } from '../store/useColorDeleteStore';
import { useColorFormStore } from '../store/useColorFormStore';
import type { Color } from '../types';

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
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
          <Ellipsis className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => handleEdit(color)}
          className='cursor-pointer'
        >
          <Pencil className='h-4 w-4' />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleDelete(color.id)}
          className='cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10'
        >
          <Trash2 className='h-4 w-4 text-destructive/60' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

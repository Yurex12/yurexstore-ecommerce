import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import type { Category } from '../types';
import { useCategoryEditStore } from '../store/useCategoryEditStore';
import { useCategoryDeleteStore } from '../store/useCategoryDeleteStore';

export default function CategoryActionsCell({
  category,
}: {
  category: Category;
}) {
  const { setEditingCategory, setFormOpen } = useCategoryEditStore();
  const { setDeleteDialogOpen, setSelectedCategoryId } =
    useCategoryDeleteStore();

  function handleDelete(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setDeleteDialogOpen(true);
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setFormOpen(true);
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
          onClick={() => handleEdit(category)}
          className='cursor-pointer flex items-center gap-2'
        >
          <Pencil className='h-4 w-4' />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleDelete(category.id)}
          className='cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive focus:bg-destructive/10'
        >
          <Trash2 className='h-4 w-4 text-destructive/60' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

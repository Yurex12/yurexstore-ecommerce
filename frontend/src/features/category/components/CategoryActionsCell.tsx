import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
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
      <DropdownMenuTrigger className='ml-8'>
        <Ellipsis className='text-2xl' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleEdit(category)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(category.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

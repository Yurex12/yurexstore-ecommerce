import EmptyState from '@/components/EmptyState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ellipsis } from 'lucide-react';

import { useCategories } from '../hook/useCategories';

import { useCategoryDeleteStore } from '../store/useCategoryDeleteStore';

import type { Category } from '../types';
import { useCategoryEditStore } from '../store/useCategoryEditStore';

export default function AdminCategoriesList() {
  const { categories, error, isPending: isFetching } = useCategories();
  const { setEditingCategory, setFormOpen } = useCategoryEditStore();
  const { setDeleteDialogOpen, setSelectedColorId } = useCategoryDeleteStore();

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!categories?.length) return <EmptyState />;

  function handleDelete(categoryId: string) {
    setSelectedColorId(categoryId);
    setDeleteDialogOpen(true);
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[30%]'>Image</TableHead>
            <TableHead className='w-[30%]'>Name</TableHead>
            <TableHead className='w-[30%]'>Description</TableHead>
            <TableHead className='w-[10%] text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className='border-b h-16'>
              <TableCell>
                <div className='flex items-center'>
                  <img
                    src={category.image}
                    alt={category.name}
                    className='w-12 h-12 object-cover rounded-md'
                  />
                </div>
              </TableCell>

              <TableCell className='font-medium'>{category.name}</TableCell>

              <TableCell className='truncate max-w-[200px] text-muted-foreground'>
                {category.description}
              </TableCell>

              <TableCell className='text-right'>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

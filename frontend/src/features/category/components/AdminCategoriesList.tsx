import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ellipsis } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import EmptyState from '@/components/EmptyState';

import { useCategories } from '../hook/useCategories';
import { useCategoryStore } from '../store/useCategoryStore';
import useDeleteCategory from '../hook/useDeleteCategory';

export default function AdminCategoriesList() {
  const { categories, error, isPending: isFetching } = useCategories();
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const { setEditingCategory, setOpen } = useCategoryStore();

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!categories?.length) return <EmptyState />;

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
                {category.description || 'No description'}
              </TableCell>

              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='ml-8'>
                    <Ellipsis className='text-2xl' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpen(true);
                        setEditingCategory(category);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteCategory(category.id)}
                      disabled={isDeleting}
                    >
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

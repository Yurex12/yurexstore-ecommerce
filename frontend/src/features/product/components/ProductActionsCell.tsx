import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useProductDeleteStore } from '../store/useProductDeleteStore';
import type { AdminProduct } from '../types';

export default function ProductActionsCell({
  product,
}: {
  product: AdminProduct;
}) {
  const navigate = useNavigate();
  const { products, error, isPending: isFetching } = useProducts();
  const { setDeleteDialogOpen, setSelectedProductId } = useProductDeleteStore();

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!products?.length) return <EmptyState />;

  function handleDelete(productId: string) {
    setSelectedProductId(productId);
    setDeleteDialogOpen(true);
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
          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
          className='cursor-pointer flex items-center gap-2'
        >
          <Pencil className='h-4 w-4' />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleDelete(product.id)}
          className='cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive focus:bg-destructive/10'
        >
          <Trash2 className='h-4 w-4 text-destructive/60' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

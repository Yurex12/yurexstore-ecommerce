import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useProductDeleteStore } from '../store/useProductDeleteStore';
import { Spinner } from '@/components/ui/spinner';
import EmptyState from '@/components/EmptyState';
import type { Product } from '../types';

export default function ProductActionsCell({ product }: { product: Product }) {
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
      <DropdownMenuTrigger>
        <Ellipsis className='text-2xl' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(product.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

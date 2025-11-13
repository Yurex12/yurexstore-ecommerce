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

import { useProducts } from '../hooks/useProducts';

import { formatCurrency } from '@/lib/helpers';
import { useNavigate } from 'react-router-dom';
import { useProductDeleteStore } from '../store/useProductDeleteStore';

export default function AdminProductsList() {
  const { products, error, isPending: isFetching } = useProducts();

  const { setDeleteDialogOpen, setSelectedProductId } = useProductDeleteStore();

  const navigate = useNavigate();

  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!products?.length) return <EmptyState />;

  function handleDelete(productId: string) {
    setSelectedProductId(productId);
    setDeleteDialogOpen(true);
  }

  function getStockStatus(quantity: number) {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (quantity < 10) return { text: 'Low Stock', color: 'text-orange-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[15%]'>Image</TableHead>
            <TableHead className='w-[25%]'>Name</TableHead>
            <TableHead className='w-[15%]'>Category</TableHead>
            <TableHead className='w-[15%]'>Price</TableHead>
            <TableHead className='w-[15%]'>Stock</TableHead>
            <TableHead className='w-[15%] text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.quantity);

            return (
              <TableRow key={product.id} className='border-b h-16'>
                <TableCell>
                  <div className='flex items-center'>
                    <img
                      src={product.images[0]?.url || '/placeholder.png'}
                      alt={product.name}
                      className='w-12 h-12 object-cover rounded-md'
                    />
                  </div>
                </TableCell>

                <TableCell className='font-medium'>{product.name}</TableCell>

                <TableCell className='text-muted-foreground'>
                  {product.category.name}
                </TableCell>

                <TableCell>{formatCurrency(product.price)}</TableCell>

                <TableCell>
                  <span className={stockStatus.color}>
                    {product.quantity} ({stockStatus.text})
                  </span>
                </TableCell>

                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='ml-8'>
                      <Ellipsis className='text-2xl' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/products/edit/${product.id}`)
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

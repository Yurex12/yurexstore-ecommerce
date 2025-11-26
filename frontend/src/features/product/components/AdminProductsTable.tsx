import EmptyState from '@/components/EmptyState';

import { DataTable } from '@/components/ui/data-table';
import { Spinner } from '@/components/ui/spinner';
import { useProducts } from '../hooks/useProducts';
import { columns } from './AdminProductsColumns';

export default function AdminProductsTable() {
  const { products, error, isPending: isFetching } = useProducts();
  if (isFetching) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!products?.length) return <EmptyState />;

  if (isFetching) return <Spinner />;

  if (error) return <p>{error}</p>;

  if (!products) return <EmptyState />;
  return (
    <div className='container mx-auto'>
      <DataTable columns={columns} data={products} />
    </div>
  );
}

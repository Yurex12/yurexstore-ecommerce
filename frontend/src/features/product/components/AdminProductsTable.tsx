import ErrorState from '@/components/AdminErrorState';
import NoData from '@/components/NoData';
import PageLoader from '@/components/PageLoader';
import { DataTable } from '@/components/ui/data-table';

import { useAdminProducts } from '../hooks/useAdminProducts';
import { useDeleteProducts } from '../hooks/useDeleteProducts';
import { useProductDeleteStore } from '../store/useProductDeleteStore';

import { columns } from './AdminProductsColumns';

export default function AdminProductsTable() {
  const { products, error, isPending } = useAdminProducts();
  const { isPending: isDeletingProducts } = useDeleteProducts();
  const { setSelectedProductIds, setDeleteDialogOpen } =
    useProductDeleteStore();

  if (isPending) return <PageLoader message='Loading products...' />;

  if (error) return <ErrorState message={error.message} />;

  if (!products?.length) return <NoData title='Product' />;

  function handleDeleteProducts(productIds: string[]) {
    setDeleteDialogOpen(true);
    setSelectedProductIds(productIds);
  }
  return (
    <div className='container mx-auto'>
      <DataTable
        columns={columns}
        data={products}
        onDeleteSelected={handleDeleteProducts}
        isDeleting={isDeletingProducts}
      />
    </div>
  );
}

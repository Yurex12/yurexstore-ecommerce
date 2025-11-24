import EmptyState from '@/components/EmptyState';
import { DataTable } from '@/components/ui/data-table';
import { Spinner } from '@/components/ui/spinner';
import { useCategories } from '../hook/useCategories';
import { columns } from './AdminCategoryColumns';

export default function AdminCategoriesTable() {
  const { categories, error, isPending: isFetching } = useCategories();

  if (isFetching) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!categories) return <EmptyState />;
  return (
    <div className='container mx-auto'>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}

import EmptyState from '@/components/EmptyState';
import { DataTable } from '@/components/ui/data-table';
import { Spinner } from '@/components/ui/spinner';
import { useCategories } from '../hook/useCategories';
import { columns } from './AdminCategoryColumns';
import { useCategoryDeleteStore } from '../store/useCategoryDeleteStore';
import useDeleteCategories from '../hook/useDeleteCategories';

export default function AdminCategoriesTable() {
  const { categories, error, isPending: isFetching } = useCategories();
  const { setSelectedCategoryIds, setDeleteDialogOpen } =
    useCategoryDeleteStore();
  const { isPending: isDeletingCategories } = useDeleteCategories();

  function handleDeleteCategories(categoryIds: string[]) {
    setDeleteDialogOpen(true);
    setSelectedCategoryIds(categoryIds);
  }

  if (isFetching) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!categories?.length) return <EmptyState />;

  return (
    <div className='container mx-auto'>
      <DataTable
        columns={columns}
        data={categories}
        onDeleteSelected={handleDeleteCategories}
        isDeleting={isDeletingCategories}
      />
    </div>
  );
}

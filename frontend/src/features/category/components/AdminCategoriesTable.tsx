import ErrorState from '@/components/AdminErrorState';
import NoData from '@/components/NoData';
import PageLoader from '@/components/PageLoader';
import { DataTable } from '@/components/ui/data-table';
import { useCategories } from '../hook/useCategories';
import useDeleteCategories from '../hook/useDeleteCategories';
import { useCategoryDeleteStore } from '../store/useCategoryDeleteStore';
import { columns } from './AdminCategoryColumns';

export default function AdminCategoriesTable() {
  const { categories, error, isPending } = useCategories();
  const { setSelectedCategoryIds, setDeleteDialogOpen } =
    useCategoryDeleteStore();
  const { isPending: isDeletingCategories } = useDeleteCategories();

  function handleDeleteCategories(categoryIds: string[]) {
    setDeleteDialogOpen(true);
    setSelectedCategoryIds(categoryIds);
  }

  if (isPending) return <PageLoader message='Loading categories...' />;

  if (error) return <ErrorState message={error.message} />;

  if (!categories?.length) return <NoData title='Category' />;
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

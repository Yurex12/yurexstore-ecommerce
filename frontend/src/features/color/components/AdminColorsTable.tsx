import ErrorState from '@/components/ErrorState';
import NoData from '@/components/NoData';
import { PageLoader } from '@/components/PageLoader';
import { DataTable } from '@/components/ui/data-table';
import { useColors } from '../hooks/useColors';
import { useDeleteColors } from '../hooks/useDeleteColors';
import { useColorDeleteStore } from '../store/useColorDeleteStore';
import { columns } from './AdminColorColumns';

export default function AdminColorsTable() {
  const { colors, error, isPending } = useColors();
  const { isPending: isDeletingColors } = useDeleteColors();
  const { setDeleteDialogOpen, setSelectedColorIds } = useColorDeleteStore();

  function handleDeleteColors(colorIds: string[]) {
    setDeleteDialogOpen(true);
    setSelectedColorIds(colorIds);
  }

  if (isPending) return <PageLoader message='Loading colors...' />;

  if (error) return <ErrorState message={error.message} />;

  if (!colors?.length) return <NoData title='Color' />;

  return (
    <div className='container mx-auto'>
      <DataTable
        columns={columns}
        data={colors}
        onDeleteSelected={handleDeleteColors}
        isDeleting={isDeletingColors}
      />
    </div>
  );
}

import EmptyState from '@/components/EmptyState';
import { DataTable } from '@/components/ui/data-table';
import { Spinner } from '@/components/ui/spinner';
import { useColors } from '../hooks/useColors';
import { useDeleteColors } from '../hooks/useDeleteColors';
import { useColorDeleteStore } from '../store/useColorDeleteStore';
import { columns } from './AdminColorColumns';

export default function AdminColorsTable() {
  const { colors, error: fetchError, isPending: isFetching } = useColors();
  const { isPending: isDeletingColors } = useDeleteColors();
  const { setDeleteDialogOpen, setSelectedColorIds } = useColorDeleteStore();

  function handleDeleteColors(colorIds: string[]) {
    setDeleteDialogOpen(true);
    setSelectedColorIds(colorIds);
  }

  if (isFetching) return <Spinner />;

  if (fetchError) return <p>{fetchError.message}</p>;

  if (!colors?.length) return <EmptyState />;
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

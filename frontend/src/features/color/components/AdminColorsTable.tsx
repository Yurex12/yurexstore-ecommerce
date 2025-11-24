import EmptyState from '@/components/EmptyState';
import { useColors } from '../hooks/useColors';
import { columns } from './AdminColorColumns';
import { DataTable } from '@/components/ui/data-table';
import { Spinner } from '@/components/ui/spinner';

export default function AdminColorsTable() {
  const { colors, error, isPending: isFetchingColor } = useColors();

  if (isFetchingColor) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!colors) return <EmptyState />;
  return (
    <div className='container mx-auto'>
      <DataTable columns={columns} data={colors} />
    </div>
  );
}

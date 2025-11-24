import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import AdminColorFormDialog from '@/features/color/components/AdminColorFormDialog';
import AdminColorsTable from '@/features/color/components/AdminColorsTable';

import { useDeleteColor } from '@/features/color/hooks/useDeleteColor';
import { useColorDeleteStore } from '@/features/color/store/useColorDeleteStore';
import { useColorFormStore } from '@/features/color/store/useColorFormStore';

export default function AdminColorsPage() {
  const { setFormOpen } = useColorFormStore();
  const { deleteColor, isPending: isDeleting } = useDeleteColor();
  const { selectedColorId, isDeleteDialogOpen, setDeleteDialogOpen } =
    useColorDeleteStore();

  function handleDelete() {
    setDeleteDialogOpen(false);
    deleteColor(selectedColorId);
  }

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Colors</h1>
        <AddBtn onClick={() => setFormOpen(true)} title='Add color' />
      </div>

      <AdminColorsTable />
      <AdminColorFormDialog />

      <ConfirmDelete
        resourceName='color'
        onConfirm={handleDelete}
        disabled={isDeleting}
        open={isDeleteDialogOpen}
        handleOpen={setDeleteDialogOpen}
      />
    </section>
  );
}

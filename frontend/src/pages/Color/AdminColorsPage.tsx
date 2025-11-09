import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import { Separator } from '@/components/ui/separator';
import AdminColorFormDialog from '@/features/color/components/AdminColorFormDialog';
import AdminColorsList from '@/features/color/components/AdminColorsList';

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
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Colors</h1>
        <AddBtn onClick={() => setFormOpen(true)} />
      </div>

      <Separator />

      <AdminColorsList />

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

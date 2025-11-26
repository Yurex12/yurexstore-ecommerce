import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import AdminColorFormDialog from '@/features/color/components/AdminColorFormDialog';
import AdminColorsTable from '@/features/color/components/AdminColorsTable';

import { useDeleteColor } from '@/features/color/hooks/useDeleteColor';
import { useDeleteColors } from '@/features/color/hooks/useDeleteColors';
import { useColorDeleteStore } from '@/features/color/store/useColorDeleteStore';
import { useColorFormStore } from '@/features/color/store/useColorFormStore';

export default function AdminColorsPage() {
  const { setFormOpen } = useColorFormStore();
  const { deleteColor, isPending: isDeletingColor } = useDeleteColor();
  const { deleteColors, isPending: isDeletingColors } = useDeleteColors();
  const {
    selectedColorId,
    selectedColorIds,
    isDeleteDialogOpen,
    setDeleteDialogOpen,
    setSelectedColorId,
    setSelectedColorIds,
  } = useColorDeleteStore();

  function handleDeleteColor() {
    setDeleteDialogOpen(false);

    if (selectedColorId) {
      deleteColor(selectedColorId, { onSuccess() {} });
    }

    if (selectedColorIds.length > 0) {
      deleteColors(selectedColorIds);
    }

    setSelectedColorId('');
    setSelectedColorIds([]);
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
        resourceName='color(s)'
        onConfirm={handleDeleteColor}
        disabled={isDeletingColor || isDeletingColors}
        open={isDeleteDialogOpen}
        handleOpen={setDeleteDialogOpen}
      />
    </section>
  );
}

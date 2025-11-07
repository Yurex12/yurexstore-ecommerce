import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import { Separator } from '@/components/ui/separator';

import ColorFormDialog from '@/features/color/components/ColorFormDialog';
import ColorsList from '@/features/color/components/ColorsList';
import { useDeleteColor } from '@/features/color/hooks/useDeleteColor';
import { useColorDeleteStore } from '@/features/color/store/useColorDeleteStore';
import { useColorFormStore } from '@/features/color/store/useColorFormStore';

export default function AdminColorsPage() {
  const { setFormOpen } = useColorFormStore();
  const { deleteColor, isPending: isDeleting } = useDeleteColor();
  const { selectedColorId, isDeleteDialogOpen, setDeleteDialogOpen } =
    useColorDeleteStore();

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Colors</h1>
        <AddBtn onClick={() => setFormOpen(true)} />
      </div>

      <Separator />

      <ColorsList />

      <ColorFormDialog />

      <ConfirmDelete
        resourceName='color'
        onConfirm={() => {
          setDeleteDialogOpen(false);
          deleteColor(selectedColorId);
        }}
        disabled={isDeleting}
        open={isDeleteDialogOpen}
        handleOpen={setDeleteDialogOpen}
      />
    </section>
  );
}

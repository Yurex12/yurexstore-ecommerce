import { useState } from 'react';

import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import AdminCreateCategoryDialog from '@/features/category/components/AdminCategoryCreateDialog';
import AdminCategoryEditDialog from '@/features/category/components/AdminCategoryEditDialog';

import AdminCategoriesTable from '@/features/category/components/AdminCategoriesTable';
import useDeleteCategories from '@/features/category/hook/useDeleteCategories';
import useDeleteCategory from '@/features/category/hook/useDeleteCategory';
import { useCategoryDeleteStore } from '@/features/category/store/useCategoryDeleteStore';

export default function AdminCategoriesPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { deleteCategory, isPending: isDeletingCategory } = useDeleteCategory();
  const {
    isDeleteDialogOpen,
    selectedCategoryIds,
    setDeleteDialogOpen,
    selectedCategoryId,
  } = useCategoryDeleteStore();

  const { deleteCategories, isPending: isDeletingCategories } =
    useDeleteCategories();

  function handleDelete() {
    setDeleteDialogOpen(false);
    if (selectedCategoryId) deleteCategory(selectedCategoryId);

    if (selectedCategoryIds) deleteCategories(selectedCategoryIds);
  }

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Categories</h1>
        <AddBtn
          onClick={() => setOpenCreateDialog(true)}
          title='Add Category'
        />
      </div>

      <AdminCategoriesTable />

      <AdminCreateCategoryDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />

      <AdminCategoryEditDialog />

      <ConfirmDelete
        resourceName='categories'
        onConfirm={handleDelete}
        disabled={isDeletingCategory || isDeletingCategories}
        open={isDeleteDialogOpen}
        handleOpen={setDeleteDialogOpen}
      />
    </section>
  );
}

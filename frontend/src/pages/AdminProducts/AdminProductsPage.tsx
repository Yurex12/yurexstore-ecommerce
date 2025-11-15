import { useNavigate } from 'react-router-dom';

import AddBtn from '@/components/AddBtn';
import { Separator } from '@/components/ui/separator';
import { ConfirmDelete } from '@/components/ConfirmDelete';

import AdminProductsList from '@/features/product/components/AdminProductsList';
import { useDeleteProduct } from '@/features/product/hooks/useDeleteProduct';
import { useProductDeleteStore } from '@/features/product/store/useProductDeleteStore';

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { isDeleteDialogOpen, setDeleteDialogOpen, selectedProductId } =
    useProductDeleteStore();

  function handleDelete() {
    setDeleteDialogOpen(false);
    deleteProduct(selectedProductId);
  }

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Products</h1>
        <AddBtn onClick={() => navigate('/admin/products/new')} />
      </div>

      <Separator />

      <AdminProductsList />

      <ConfirmDelete
        resourceName='categories'
        onConfirm={handleDelete}
        disabled={isDeleting}
        open={isDeleteDialogOpen}
        handleOpen={setDeleteDialogOpen}
      />
    </section>
  );
}

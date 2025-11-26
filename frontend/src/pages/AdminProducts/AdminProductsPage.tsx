import { useNavigate } from 'react-router-dom';

import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';

import AdminProductsTable from '@/features/product/components/AdminProductsTable';
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
    <section>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Products</h1>
        <AddBtn
          onClick={() => navigate('/admin/products/new')}
          title='Add Product'
        />
      </div>

      <AdminProductsTable />

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

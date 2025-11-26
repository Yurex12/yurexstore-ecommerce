import { useNavigate } from 'react-router-dom';

import AddBtn from '@/components/AddBtn';
import { ConfirmDelete } from '@/components/ConfirmDelete';

import AdminProductsTable from '@/features/product/components/AdminProductsTable';
import { useDeleteProduct } from '@/features/product/hooks/useDeleteProduct';
import { useProductDeleteStore } from '@/features/product/store/useProductDeleteStore';
import { useDeleteProducts } from '@/features/product/hooks/useDeleteProducts';

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const {
    isDeleteDialogOpen,
    setDeleteDialogOpen,
    selectedProductId,
    selectedProductIds,
    setSelectedProductId,
    setSelectedProductIds,
  } = useProductDeleteStore();
  const { deleteProducts } = useDeleteProducts();

  function handleDelete() {
    setDeleteDialogOpen(false);
    if (selectedProductId) deleteProduct(selectedProductId);
    if (selectedProductIds.length > 0) deleteProducts(selectedProductIds);

    setSelectedProductId('');
    setSelectedProductIds([]);
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

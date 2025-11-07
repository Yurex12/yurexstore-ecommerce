import AddBtn from '@/components/AddBtn';
import { Separator } from '@/components/ui/separator';
import AdminCategoriesList from '@/features/category/components/AdminCategoriesList';
import AdminCategoryDialog from '@/features/category/components/AdminCategoryDialog';
import { useCategoryStore } from '@/features/category/store/useCategoryStore';

export default function AdminCategoriesPage() {
  const { setOpen } = useCategoryStore();

  return (
    <section className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='heading'>Categories</h1>
        <AddBtn onClick={() => setOpen(true)} />
      </div>

      <Separator />

      <AdminCategoriesList />

      <AdminCategoryDialog />
    </section>
  );
}

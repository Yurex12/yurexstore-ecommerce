import CategoriesList from '@/features/category/components/CategoriesList';

export default function FeaturedCategories() {
  return (
    <div className='mt-10 space-y-2'>
      <h1 className='heading'>Featured Category</h1>

      <CategoriesList />
    </div>
  );
}

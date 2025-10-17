import ProductCard from '@/features/product/components/ProductCard';

export default function ProductShowcase() {
  return (
    <div className='mx-auto mt-12'>
      <h1 className='text-center heading sm:text-left'>Products</h1>
      <div className='mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 lg:grid-cols-4'>
        {[1, 2, 3, 4].map((product) => (
          <ProductCard />
        ))}
      </div>
    </div>
  );
}

import ProductCard from './ProductCard';

export default function Products() {
  return (
    <div className='h-auto'>
      <div className='p-2'>
        <div className='mt-3 grid grid-cols-2 items-center justify-around gap-x-3 gap-y-6 md:grid lg:grid-cols-3 xl:grid-cols-4'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 0].map((i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

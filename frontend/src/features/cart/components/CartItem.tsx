import { Minus, Plus } from 'lucide-react';

export default function CartItem() {
  return (
    <div className='flex items-center justify-between py-10'>
      {/* image */}
      <div className='flex gap-x-4'>
        <img src='shirt.png' alt='' className='w-24' />
        <div className='flex flex-col md:space-y-2'>
          <p className='font-semibold text-gray-700'>Basic Tee</p>
          <p className='text-gray-500'>Shirts</p>
          <p className='text-gray-700'>$50.00</p>
          <button className='mt-auto block text-left font-semibold text-red-500 text-sm md:hidden'>
            Remove
          </button>
          {/* <p className="font-semibold text-gray-700">$50.00</p> */}
        </div>
      </div>
      {/* quantity */}
      <div className='flex flex-col items-center gap-y-4'>
        <div className='flex items-center divide-x rounded-md border border-gray-200 p-1'>
          <button className='px-2 text-gray-500'>
            <Minus size={20} />
          </button>
          <span className='px-2 font-semibold text-gray-500 text-sm'>2</span>
          <button className='px-2 text-sm text-gray-500'>
            <Plus size={20} />
          </button>
        </div>
        <span className='block font-semibold text-gray-700 md:hidden'>
          $100.00
        </span>
      </div>
      {/* subtotal */}
      <div className='hidden md:block'>
        <span className='font-semibold text-gray-700'>$200.00</span>
      </div>
      {/* remove */}
      <div className='hidden md:block'>
        <button className='mt-auto text-left font-semibold text-red-500'>
          Remove
        </button>
      </div>
    </div>
  );
}

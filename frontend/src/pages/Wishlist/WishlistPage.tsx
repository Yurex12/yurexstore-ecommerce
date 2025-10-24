import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
};

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Nike Air Max 270 ',
      price: 23000,
      image: '/shirt.png',
      inStock: true,
    },
    {
      id: '2',
      name: 'Samsung Galaxy Buds',
      price: 12000,
      image: '/shirt.png',
      inStock: false,
    },
  ]);

  const handleAddToCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className='text-center py-12 text-muted-foreground'>
        No items in your wishlist.
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>Wishlist (2)</h2>

      <Separator />
      {items.map((item) => (
        <div
          key={item.id}
          className='
            p-4 border rounded-md bg-background
            sm:flex sm:items-center sm:justify-between space-y-2
          '
        >
          {/* LEFT */}
          <div
            className={`
              flex gap-4 sm:mb-0
              ${!item.inStock ? 'opacity-40 grayscale-50' : ''}
            `}
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-20 h-20 rounded-md object-cover'
            />

            <div>
              <h3 className='font-medium'>{item.name}</h3>
              <p className='text-sm text-muted-foreground'>
                ₦ {item.price.toLocaleString()}
              </p>
            </div>
          </div>

          <Separator className='block sm:hidden' />

          {/* RIGHT */}
          <div className='flex gap-2 items-center justify-between sm:justify-end'>
            <button
              onClick={() => handleRemove(item.id)}
              className='font-semibold text-destructive/80 hover:bg-destructive/5
                text-sm py-2 px-4 rounded cursor-pointer'
            >
              Remove
            </button>

            {item.inStock ? (
              <Button
                onClick={() => handleAddToCart(item.id)}
                className='w-28 cursor-pointer'
              >
                Add to Cart
              </Button>
            ) : (
              <Button disabled variant='outline' className='w-28'>
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

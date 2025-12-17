import WishlistItem from './WishlistItem';

import { useWishlist } from '../hooks/useWishlist';

import InlineError from '@/components/InlineError';
import WishlistItemsSkeleton from './WishlistItemsSkeleton';

export default function WishlistItemsList() {
  const { isPending, wishlist, error } = useWishlist();

  if (isPending) return <WishlistItemsSkeleton />;

  if (error) return <InlineError message='Unable to load wishlist' />;

  if (!wishlist?.length)
    return (
      <div className='mt-10'>
        <p className='text-center text-muted-foreground'>
          There are currently no products in your wishlist.
        </p>
      </div>
    );

  return (
    <div className='space-y-4'>
      {wishlist.map((wishlist) => (
        <WishlistItem key={wishlist.id} {...wishlist} />
      ))}
    </div>
  );
}

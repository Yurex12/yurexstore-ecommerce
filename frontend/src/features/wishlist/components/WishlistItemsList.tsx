import WishlistItem from './WishlistItem';

import { useWishlist } from '../hooks/useWishlist';

import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import WishlistItemsSkeleton from './WishlistItemsSkeleton';

export default function WishlistItemsList() {
  const { isPending, wishlist, error } = useWishlist();

  if (isPending) return <WishlistItemsSkeleton />;

  if (error)
    return (
      <ErrorState
        message='Unable to load wishlist'
        className='h-[80svh] md:h-[60svh] border-0'
      />
    );

  if (!wishlist?.length)
    return (
      <EmptyState
        message='There are currently no products in your wishlist.'
        className='h-[80svh] md:h-[60svh] border-0'
      />
    );

  return (
    <div className='space-y-4'>
      {wishlist.map((wishlist) => (
        <WishlistItem key={wishlist.id} {...wishlist} />
      ))}
    </div>
  );
}

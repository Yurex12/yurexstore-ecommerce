import WishlistItem from './WishlistItem';

import { useWishlist } from '../hooks/useWishlist';

import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/InlineError';
import WishlistItemsSkeleton from './WishlistItemsSkeleton';

export default function WishlistItemsList() {
  const { isPending, wishlist, error } = useWishlist();

  if (isPending) return <WishlistItemsSkeleton />;

  if (error) return <InlineError message='Unable to load wishlist' />;

  if (!wishlist?.length)
    return (
      <EmptyState message='There are currently no products in your wishlist' />
    );
  return (
    <div className='space-y-4'>
      {wishlist.map((wishlist) => (
        <WishlistItem key={wishlist.id} {...wishlist} />
      ))}
    </div>
  );
}

import { Spinner } from '@/components/ui/spinner';
import useWishlist from '../hooks/useWishlist';
import WishlistItem from './wishlistItem';

export default function WishlistItemsList() {
  const { isPending, wishlist, error } = useWishlist();
  if (isPending) return <Spinner />;

  if (error) return <p>{error.message}</p>;

  if (!wishlist?.length) {
    return <p>There are currently no products in your wishlist</p>;
  }
  return (
    <div className='space-y-4'>
      {wishlist.map((wishlistItem) => (
        <WishlistItem key={wishlistItem.id} {...wishlistItem} />
      ))}
    </div>
  );
}

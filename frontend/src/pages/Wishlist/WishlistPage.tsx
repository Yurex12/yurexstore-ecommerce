import { Separator } from '@/components/ui/separator';
import WishlistItemsList from '@/features/wishlist/components/WishlistItemsList';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>
        {wishlist?.length ? `Wishlist (${wishlist.length})` : 'Wishlist'}
      </h2>

      <Separator />

      <WishlistItemsList />
    </div>
  );
}

import { Button } from '@/components/ui/button';
import useAddToCart from '../hooks/useAddToCart';
import { Spinner } from '@/components/ui/spinner';

export default function AddToCartBtn({
  productId,
  productVariantId,
}: {
  productId: string;
  productVariantId?: string;
}) {
  const { addToCart, isPending } = useAddToCart();

  return (
    <Button
      className='w-full border border-foreground/40 rounded text-foreground/70 hover:bg-primary hover:text-background hover:border-primary'
      variant='outline'
      onClick={() => addToCart({ productId, productVariantId })}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : <span>Add to cart</span>}
    </Button>
  );
}

import { Button } from '@/components/ui/button';
import useCart from '@/features/cart/hooks/useCart';

export default function OrderSummary() {
  const { cart, isPending } = useCart();
  return (
    <div className='basis-2/6 lg:mt-10 '>
      <div className='mx-auto rounded-sm bg-muted/50 px-8 py-8'>
        <h2 className='text-xl'>Order summary</h2>

        {/* <!-- order table --> */}
        <div className='my-4'>
          {/* <!-- subtotal --> */}
          <div className='flex items-center justify-between border-b py-4'>
            <p>Items 5</p>
            <p className='font-semibold'>
              $200.00<span className='subtotal'></span>
            </p>
          </div>
          {/* <!-- Shipping estimate --> */}
          <div className='flex items-center justify-between border-b py-4'>
            <p>
              Shipping estimate <br />
              (5% of subtotal)
            </p>
            <p className='font-semibold'>
              $200.00<span data-shipping-estimate></span>
            </p>
          </div>
          {/* <!-- Tax estimate --> */}
          <div className='flex items-center justify-between border-b py-4'>
            <p>Tax</p>
            <p className='font-semibold' data-tax>
              $<span>5.00</span>
            </p>
          </div>
          {/* <!-- order total --> */}
          <div className='flex items-center justify-between py-4'>
            <p className='text-md font-semibold '>Order total</p>
            <p className='text-md font-semibold text-foreground'>
              $405.00<span data-cart-total></span>
            </p>
          </div>
        </div>

        <Button className='w-full'>Checkout</Button>
      </div>
    </div>
  );
}

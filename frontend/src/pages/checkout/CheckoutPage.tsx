import { Separator } from '@/components/ui/separator';
import { CustomerAddress } from '@/features/address/components/CustomerAddress';
import OrderSummary from '@/features/order/components/OrderSummary';
import CheckoutItemsList from './components/CheckoutItemsList';
import useCart from '@/features/cart/hooks/useCart';
import InlineError from '@/components/InlineError';
import { EmptyState } from '@/components/EmptyState';

import CheckoutSkeleton from './components/CheckoutSkeleton';
import { useAddressStore } from '@/features/address/store/useAddressStore';
import { usePaymentStore } from '@/features/order/store/usePaymentStore';
import useCreateOrder from '@/features/order/hooks/useCreateOrder';

export default function CheckoutPage() {
  const { cart, isPending: isFetchingCart, error } = useCart();
  const { createOrder, isPending: isCreating } = useCreateOrder();

  const { addresses, selectedAddressId } = useAddressStore();
  const { selectedMethod } = usePaymentStore();

  if (isFetchingCart) return <CheckoutSkeleton />;

  if (error) return <InlineError message='Unable to load your cart' />;

  if (!cart?.length) return <EmptyState message='Your cart is empty' />;

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

  const orderItems = cart.map((cartItem) => ({
    productId: cartItem.product.id,
    productVariantId: cartItem.productVariantId,
    quantity: cartItem.quantity,
  }));

  const deliveryAddress = `${selectedAddress?.deliveryAddress} | ${selectedAddress?.city} | ${selectedAddress?.state}`;
  const phone = selectedAddress?.phone;

  const order = {
    orderItems,
    deliveryAddress,
    phone,
    paymentMethod: selectedMethod,
  };

  function handleOrder() {
    createOrder(order);
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[60%_35%] gap-5 justify-between lg:space-y-8'>
      <div className='space-y-6'>
        <CustomerAddress />

        <div className='border space-y-2 px-4 py-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Order Items</h1>
          <Separator />
          <CheckoutItemsList />
        </div>
      </div>

      <OrderSummary
        onOrder={handleOrder}
        disabled={!selectedAddress}
        isCreatingOrder={isCreating}
      />
    </div>
  );
}

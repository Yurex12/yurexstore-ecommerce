import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAddressStore } from '@/features/address/store/useAddressStore';
import useCart from '@/features/cart/hooks/useCart';
import toast from 'react-hot-toast';
import useCreateOrder from '../hooks/useCreateOrder';
import { usePaymentStore } from '../store/usePaymentStore';
import { OrderPriceSummary } from './OrderPriceSummary';
import PaymentOptions from './PaymentOptions';
import { Spinner } from '@/components/ui/spinner';

export default function OrderSummary() {
  const { cart, isPending } = useCart();
  const { addresses, selectedAddressId } = useAddressStore();
  const { selectedMethod } = usePaymentStore();
  const { createOrder, isPending: isCreating } = useCreateOrder();
  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!cart?.length) {
    return <p>No product in cart</p>;
  }

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);
  if (!selectedAddress) {
    toast.error('You need to select an address');
    return;
  }

  const orderItems = cart.map((cartItem) => ({
    productId: cartItem.product.id,
    productVariantId: cartItem.productVariantId,
    quantity: cartItem.quantity,
  }));

  const deliveryAddress = `${selectedAddress.deliveryAddress} | ${selectedAddress.city} | ${selectedAddress.state}`;
  const phone = selectedAddress.phone;

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
    <div className='border h-fit rounded-xl p-5 space-y-6'>
      <h1 className='text-xl font-semibold'>Order Summary</h1>
      <Separator />
      <PaymentOptions />

      <Separator />

      <OrderPriceSummary />

      <Button className='w-full' onClick={handleOrder}>
        {isCreating ? <Spinner /> : <span> Confirm Order</span>}
      </Button>
    </div>
  );
}

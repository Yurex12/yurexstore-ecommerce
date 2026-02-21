import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

import FullPageLoader from '@/components/FullPageLoader';
import CheckoutItemsList from './components/CheckoutItemsList';
import CheckoutSkeleton from './components/CheckoutSkeleton';

import ErrorState from '@/components/ErrorState';
import { CheckoutCustomerAddresses } from '@/features/address/components/CheckoutCustomerAddresses';
import { useAddressStore } from '@/features/address/store/useAddressStore';
import { useCart } from '@/features/cart/hooks/useCart';
import OrderSummary from '@/features/order/components/OrderSummary';
import { useCreateOrder } from '@/features/order/hooks/useCreateOrder';
import useCreatePaymentIntent from '@/hooks/useCreatePaymentIntent';

export default function CheckoutPage() {
  const { cart, isPending: isFetchingCart, error } = useCart();
  const { createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined,
  );

  const justOrdered = useRef(false);

  const { addresses, selectedAddressId } = useAddressStore();

  const { createPaymentIntent, isPending: isCreatingPaymentIntent } =
    useCreatePaymentIntent();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
  }, []);

  if (isFetchingCart) return <CheckoutSkeleton />;

  if (error)
    return (
      <ErrorState
        message='unable to load products.'
        className='h-[80svh] border-0'
      />
    );

  if (!cart?.length && !isCreatingOrder && !justOrdered.current)
    return <Navigate to='/shop' replace />;

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

  function confirmCashOrder() {
    if (!selectedAddress || !selectedAddress.phone) {
      toast.error('Please select a valid address before placing your order');
      return;
    }

    createOrder(
      {
        deliveryAddress: `${selectedAddress!.deliveryAddress} | ${
          selectedAddress!.city
        } | ${selectedAddress!.state}`,
        phone: selectedAddress.phone,
      },
      {
        onSuccess(orderId) {
          justOrdered.current = true;
          navigate(`/account/orders/${orderId}`);
        },
      },
    );
  }

  function createStripePaymentIntent() {
    if (!selectedAddress || !selectedAddress.phone) {
      toast.error('Please select a valid address before placing your order');
      return;
    }

    createPaymentIntent(
      {
        deliveryAddress: `${selectedAddress!.deliveryAddress} | ${
          selectedAddress!.city
        } | ${selectedAddress!.state}`,
        phone: selectedAddress.phone,
      },
      {
        onSuccess(data) {
          setClientSecret(data?.clientSecret);
        },
      },
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-[60%_35%] gap-5 justify-between lg:space-y-8'>
        <div className='space-y-6'>
          <CheckoutCustomerAddresses />

          <div className='border space-y-2 px-4 py-4 rounded-md'>
            <h1 className='text-xl font-semibold'>Order Items</h1>
            <Separator />
            <CheckoutItemsList />
          </div>
        </div>

        <OrderSummary
          onConfirmCashOrder={confirmCashOrder}
          selectedAddress={selectedAddress}
          isProcessingCashOrder={isCreatingOrder}
          isProcessingStripePayment={isCreatingPaymentIntent}
          onCreatePaymentIntent={createStripePaymentIntent}
          clientSecret={clientSecret}
        />
      </div>

      {isCreatingOrder && <FullPageLoader text='Placing your order...' />}
    </div>
  );
}

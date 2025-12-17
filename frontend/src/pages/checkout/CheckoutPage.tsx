import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

import FullPageLoader from '@/components/FullPageLoader';
import InlineError from '@/components/InlineError';
import CheckoutItemsList from './components/CheckoutItemsList';
import CheckoutSkeleton from './components/CheckoutSkeleton';

import { CheckoutCustomerAddresses } from '@/features/address/components/CheckoutCustomerAddresses';
import { useAddressStore } from '@/features/address/store/useAddressStore';
import { useCart } from '@/features/cart/hooks/useCart';
import OrderSummary from '@/features/order/components/OrderSummary';
import { useCreateOrder } from '@/features/order/hooks/useCreateOrder';
import { usePaymentStore } from '@/features/order/store/usePaymentStore';
import useCreatePaymentIntent from '@/hooks/useCreatePaymentIntent';

export default function CheckoutPage() {
  const { cart, isPending: isFetchingCart, error } = useCart();
  const { createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  const { addresses, selectedAddressId } = useAddressStore();
  const { selectedMethod } = usePaymentStore();
  const { createPaymentIntent, isPending: isCreatingPaymentIntent } =
    useCreatePaymentIntent();

  const navigate = useNavigate();

  if (isFetchingCart) return <CheckoutSkeleton />;

  if (error) return <InlineError message='Unable to load your cart' />;

  if (!cart?.length) return <Navigate to='/shop' replace />;

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

  const orderItems = cart.map((cartItem) => ({
    productId: cartItem.product.id,
    productVariantId: cartItem.productVariantId,
    quantity: cartItem.quantity,
  }));

  function confirmCashOrder() {
    if (!selectedAddress || !selectedAddress.phone) {
      toast.error('Please select a valid address before placing your order');
      return;
    }

    createOrder(
      {
        orderItems,
        deliveryAddress: `${selectedAddress!.deliveryAddress} | ${
          selectedAddress!.city
        } | ${selectedAddress!.state}`,
        phone: selectedAddress.phone,
        paymentMethod: selectedMethod,
      },
      {
        onSuccess(orderId) {
          navigate(`/account/orders/${orderId}`);
        },
      }
    );
  }

  function createStripePaymentIntent() {
    if (!selectedAddress || !selectedAddress.phone) {
      toast.error('Please select a valid address before placing your order');
      return;
    }

    createPaymentIntent(
      {
        orderItems,
        deliveryAddress: `${selectedAddress!.deliveryAddress} | ${
          selectedAddress!.city
        } | ${selectedAddress!.state}`,
        phone: selectedAddress.phone,
        paymentMethod: selectedMethod,
      },
      {
        onSuccess(data) {
          setClientSecret(data?.clientSecret);
        },
      }
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

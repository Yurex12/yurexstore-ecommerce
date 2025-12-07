import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { Separator } from '@/components/ui/separator';

import CheckoutItemsList from './components/CheckoutItemsList';
import InlineError from '@/components/InlineError';
import EmptyState from '@/components/EmptyState';
import FullPageLoader from '@/components/FullPageLoader';
import CheckoutSkeleton from './components/CheckoutSkeleton';

import { useAddressStore } from '@/features/address/store/useAddressStore';
import { usePaymentStore } from '@/features/order/store/usePaymentStore';
import { useCreateOrder } from '@/features/order/hooks/useCreateOrder';
import { CustomerAddress } from '@/features/address/components/CustomerAddress';
import OrderSummary from '@/features/order/components/OrderSummary';
import { useCart } from '@/features/cart/hooks/useCart';
import useCreatePaymentIntent from '@/hooks/useCreatePaymentIntent';
import StripeCheckoutForm from './components/StripeCheckoutForm';
import { useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)!;

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

  if (!cart?.length) return <EmptyState message='Your cart is empty' />;

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

  const orderItems = cart.map((cartItem) => ({
    productId: cartItem.product.id,
    productVariantId: cartItem.productVariantId,
    quantity: cartItem.quantity,
  }));

  function handleOrder() {
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

  function handlePaymentIntent() {
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
          isCreatingOrder={isCreatingOrder}
          onPaymentIntent={handlePaymentIntent}
          isCreatingPaymentIntent={isCreatingPaymentIntent}
          clientSecret={clientSecret}
        />
      </div>

      {isCreatingOrder && <FullPageLoader text='Placing your order...' />}

      {selectedMethod === 'STRIPE' && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
}

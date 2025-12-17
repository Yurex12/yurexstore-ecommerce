import { useEffect, useRef, useState } from 'react';

import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import OrderProcessingCard from '@/features/order/components/OrderProcessingCard';
import OrderSuccessCard from '@/features/order/components/OrderSuccessCard';
import OrderTimeoutCard from '@/features/order/components/OrderTimeoutCard';
import { useOrderStatus } from '@/features/order/hooks/useOrderStatus';
import { useQueryClient } from '@tanstack/react-query';

type Status = 'PROCESSING' | 'CONFIRMED' | 'TIMEOUT';

export default function OrderConfirmationPage() {
  const [status, setStatus] = useState<Status>('PROCESSING');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const timeoutRef = useRef<number | null>(null);

  const paymentId = searchParams.get('payment_intent');

  const { order } = useOrderStatus(paymentId);

  useEffect(() => {
    if (status !== 'PROCESSING') return;

    timeoutRef.current = setTimeout(() => {
      setStatus('TIMEOUT');
    }, 60_000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (order?.status === 'CONFIRMED') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });

      setStatus('CONFIRMED');
      const successId = setTimeout(
        () => navigate(`/account/orders/${order.orderId}`),
        1000
      );
      return () => clearTimeout(successId);
    }
  }, [order, navigate, queryClient]);

  if (!paymentId) return <Navigate to='/cart' replace />;

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        {status === 'PROCESSING' && <OrderProcessingCard />}

        {status === 'CONFIRMED' && <OrderSuccessCard />}

        {status === 'TIMEOUT' && <OrderTimeoutCard />}
      </div>
    </div>
  );
}

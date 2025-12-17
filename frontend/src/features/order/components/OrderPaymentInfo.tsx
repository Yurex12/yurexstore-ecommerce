import { formatCurrency } from '@/lib/helpers';

export default function OrderPaymentInfo({
  paymentMethod,
  deliveryFee,
  totalPrice,
}: {
  paymentMethod: string;
  deliveryFee: number;
  totalPrice: number;
}) {
  return (
    <div className='border rounded-xl p-4 bg-background space-y-4 flex-1'>
      <h3 className='font-semibold'>Payment Information</h3>

      <div className='space-y-1'>
        <h3 className='text-sm font-medium text-foreground/80'>
          Payment Method
        </h3>
        <p className='text-sm text-muted-foreground'>
          {paymentMethod.split('_').join(' ')}
        </p>
      </div>

      <div className='space-y-1 text-sm'>
        <h3 className='text-sm font-medium text-foreground/80'>
          Payment Details
        </h3>
        <div className='flex justify-between'>
          <span>Items total:</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Delivery Fees:</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className='flex justify-between font-medium'>
          <span>Total:</span>
          <span>{formatCurrency(totalPrice + deliveryFee)}</span>
        </div>
      </div>
    </div>
  );
}

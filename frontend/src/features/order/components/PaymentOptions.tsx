import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePaymentStore } from '../store/usePaymentStore';

export default function PaymentOptions() {
  const { selectedMethod, setPaymentMethod } = usePaymentStore();
  return (
    <div className='space-y-3'>
      <h3 className='font-normal'>Payment Options</h3>

      <RadioGroup
        defaultValue={selectedMethod}
        onValueChange={setPaymentMethod}
        className='space-y-2'
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='CASH_ON_DELIVERY' id='CASH_ON_DELIVERY' />
          <Label htmlFor='CASH_ON_DELIVERY' className='text-sm'>
            Cash on Delivery
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='STRIPE' id='STRIPE' />
          <Label htmlFor='STRIPE' className='text-sm'>
            Stripe
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

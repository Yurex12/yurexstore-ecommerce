import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function PaymentOptions() {
  return (
    <div className='space-y-3'>
      <h3 className='font-normal'>Payment Options</h3>

      <RadioGroup defaultValue='cod' className='space-y-2'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='cod' id='cod' />
          <Label htmlFor='cod' className='text-sm'>
            Cash on Delivery
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='stripe' id='stripe' />
          <Label htmlFor='stripe' className='text-sm'>
            Stripe
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

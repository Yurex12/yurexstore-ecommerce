import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

export default function PromotionalSection() {
  return (
    <div className=' mx-auto mt-10 flex flex-col items-center justify-around rounded-lg px-4 py-2 sm:mt-28 md:flex-row md:gap-20 bg-muted/50 '>
      {/* image */}
      <div className='md:basis-1/2'>
        <img src='promotion.png' alt='' className='object-cover' />
      </div>

      {/* content */}
      <div className='space-y-5 py-6 md:basis-1/2'>
        <h2 className='text-center text-xl font-semibold md:text-left'>
          Limited offer
        </h2>
        <p className='mx-auto max-w-md text-left text-sm md:mx-0 md:text-base lg:text-xl'>
          Spend a minimal of $100 and get 30% off voucher code for your next
          purchase.{' '}
        </p>
        <div className='flex justify-center md:justify-start'>
          <Button className='rounded-lg bg-foreground/90 has-[>svg]:px-6 text-background hover:bg-foreground'>
            <span>Grab it now</span>
            <MoveRight className='text-lg' />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Separator } from '@/components/ui/separator';
import { CreateAddressForm } from '@/features/address/components/CreateAddressForm';

import { ArrowLeft } from 'lucide-react';

export default function CreateAddressPage() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <button>
          <ArrowLeft className='cursor-pointer' />
        </button>
        <h1 className='font-semibold text-lg'>Create Address</h1>
      </div>

      <Separator />

      <CreateAddressForm />
    </div>
  );
}

import { Separator } from '@/components/ui/separator';
import { EditAddressForm } from '@/features/address/components/EditAddressForm';

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditAddressPage() {
  const navigate = useNavigate();
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <button onClick={() => navigate('/account/addresses')}>
          <ArrowLeft className='cursor-pointer' />
        </button>
        <h1 className='font-semibold text-lg'>Edit Address</h1>
      </div>

      <Separator />

      <EditAddressForm />
    </div>
  );
}

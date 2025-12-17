import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import AdminProductCreateForm from '@/features/product/components/AdminProductCreateForm';

export default function AdminProductCreatePage() {
  return (
    <div className='space-y-2'>
      <div className='flex gap-x-4'>
        <Link
          to='/admin/products'
          className='flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm'
        >
          <ArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      <AdminProductCreateForm />
    </div>
  );
}

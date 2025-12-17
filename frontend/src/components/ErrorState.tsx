import { LucideAlertCircle } from 'lucide-react';
export default function ErrorState({
  message = 'Something went wrong!',
}: {
  message?: string;
}) {
  return (
    <div className='flex min-h-[75vh] md:min-h-[60vh] flex-col items-center justify-center p-4'>
      <div className='max-w-md text-center'>
        <LucideAlertCircle className='mx-auto text-red-500' size={50} />
        <h2 className='mt-4 text-2xl font-bold text-gray-700'>Error</h2>
        <p className='mt-2 text-base text-gray-500'>{message}</p>
      </div>
    </div>
  );
}

import { Spinner } from '@/components/ui/spinner';

export default function FullPageLoader({
  text = 'Processing your order...',
}: {
  text?: string;
}) {
  return (
    <div className='fixed inset-0 bg-foreground/40 backdrop-blur-sm flex flex-col items-center justify-center z-50'>
      <Spinner className='w-8 h-8 text-background' />
      <p className='mt-3 text-background text-sm font-medium'>{text}</p>
    </div>
  );
}

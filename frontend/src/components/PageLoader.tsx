import { Spinner } from './ui/spinner';

export function PageLoader({ message }: { message?: string }) {
  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-center min-h-[75vh] md:min-h-[60vh] w-full'>
        <div className='flex flex-col items-center gap-3'>
          <Spinner className='h-10 w-10' />
          <p className='text-sm text-muted-foreground'>
            {message ?? 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
}

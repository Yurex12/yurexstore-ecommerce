import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountOverviewSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='border-b pb-4 border-border'>
        <Skeleton className='h-6 w-48' />
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
        <Card className='border border-input rounded-xl shadow-none hover:shadow-md transition-shadow duration-200 flex-1'>
          <CardHeader className='flex items-center justify-between'>
            <Skeleton className='h-5 w-40' />
            <Skeleton className='h-8 w-8 rounded-full' />
          </CardHeader>

          <CardContent className='space-y-3'>
            <Skeleton className='h-8 w-36' />
            <Skeleton className='h-5 w-52' />
            <Skeleton className='h-4 w-40' />
          </CardContent>
        </Card>

        <Card className='border border-input rounded-xl shadow-none hover:shadow-md transition-shadow duration-200 flex-1'>
          <CardHeader className='flex items-center justify-between'>
            <Skeleton className='h-5 w-44' />
            <Skeleton className='h-8 w-20' />
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='flex items-start gap-3'>
              <Skeleton className='h-6 w-6 rounded-full mt-1' />
              <div className='space-y-2 w-full'>
                <Skeleton className='h-5 w-40' />
                <Skeleton className='h-4 w-56' />
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-24 mt-2' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

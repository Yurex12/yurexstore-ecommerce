import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function TopProductsChartSkeleton() {
  return (
    <Card className='shadow-none rounded-xl border'>
      <CardHeader className='space-y-2'>
        <div className='h-5 w-1/3 animate-pulse rounded bg-muted' />

        <div className='h-4 w-1/4 animate-pulse rounded bg-muted/60' />
      </CardHeader>
      <CardContent>
        <div className='flex h-[350px] w-full flex-col justify-between py-4'>
          {[85, 65, 45, 30, 20].map((width, i) => (
            <div key={i} className='flex items-center gap-4'>
              <div className='h-3 w-20 animate-pulse rounded bg-muted/40' />

              <div
                className='h-8 animate-pulse rounded-r-md bg-muted'
                style={{ width: `${width}%` }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

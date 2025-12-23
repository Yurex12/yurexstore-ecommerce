import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function OverviewChartSkeleton() {
  return (
    <Card className='shadow-none rounded-xl border'>
      <CardHeader className='space-y-2'>
        <div className='h-5 w-1/4 animate-pulse rounded bg-muted' />

        <div className='h-4 w-1/3 animate-pulse rounded bg-muted/60' />
      </CardHeader>
      <CardContent>
        <div className='flex h-[350px] w-full flex-col justify-between'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='w-full border-t border-muted/40'
              style={{ opacity: 1 - i * 0.2 }}
            />
          ))}

          <div className='flex justify-between pt-4'>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className='h-3 w-10 animate-pulse rounded bg-muted'
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

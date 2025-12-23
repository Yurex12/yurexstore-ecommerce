// components/analytics/AnalyticsError.tsx
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Shadcn utility for merging classes
import { AlertCircle } from 'lucide-react';

export function AnalyticsError({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        'flex w-full items-center justify-center border-dashed shadow-none',
        className
      )}
    >
      <CardContent className='flex flex-col items-center gap-2 pt-6 text-center'>
        <AlertCircle size={20} className='text-destructive' />
        <div className='space-y-1'>
          <p className='text-sm font-medium text-destructive'>
            Error loading {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

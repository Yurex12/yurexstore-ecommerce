import { Separator } from '@/components/ui/separator';
import PendingReviewsList from '@/features/review/components/PendingReviewsList';
import { usePendingReviews } from '@/features/review/hooks/usePendingReviews';

export default function PendingReviewsPage() {
  const { pendingReviews } = usePendingReviews();
  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-foreground'>
        {pendingReviews?.length
          ? `Pending Reviews (${pendingReviews.length})`
          : 'Pending Reviews'}
      </h2>

      <Separator />

      <PendingReviewsList />
    </div>
  );
}

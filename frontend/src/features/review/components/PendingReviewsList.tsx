import InlineError from '@/components/InlineError';
import { usePendingReviews } from '../hooks/usePendingReviews';
import PendingReviewCard from './PendingReviewCard';
import { PendingReviewsSkeleton } from './PendingReviewSkeleton';

export default function PendingReviewsList() {
  const { pendingReviews, isPending, error } = usePendingReviews();

  if (isPending) return <PendingReviewsSkeleton />;
  if (error) return <InlineError message='Failed to fetch pending reviews' />;

  if (!pendingReviews?.length)
    return (
      <div className='mt-10'>
        <p className='text-center text-muted-foreground'>No pending reviews.</p>
      </div>
    );

  return (
    <div className='space-y-4'>
      {pendingReviews.map((pendingReview) => (
        <PendingReviewCard
          key={pendingReview.id}
          pendingReview={pendingReview}
        />
      ))}
    </div>
  );
}

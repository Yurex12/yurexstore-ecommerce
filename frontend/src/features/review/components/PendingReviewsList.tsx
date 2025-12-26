import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import { usePendingReviews } from '../hooks/usePendingReviews';
import PendingReviewCard from './PendingReviewCard';
import { PendingReviewsSkeleton } from './PendingReviewSkeleton';

export default function PendingReviewsList() {
  const { pendingReviews, isPending, error } = usePendingReviews();

  if (isPending) return <PendingReviewsSkeleton />;
  if (error)
    return (
      <ErrorState
        message='Unable to load'
        className='h-[80svh] md:h-[60svh] border-0'
      />
    );

  if (!pendingReviews?.length)
    return (
      <EmptyState
        message='You have no pending reviews'
        className='h-[80svh] md:h-[60svh] border-0'
      />
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

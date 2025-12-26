import EmptyState from '@/components/EmptyState';
import InlineError from '@/components/ErrorState';
import ReviewCard from '@/features/review/components/ReviewCard';
import { ReviewsSkeleton } from '@/features/review/components/ReviewsSkeleton';
import { useReviews } from '@/features/review/hooks/useReviews';

export default function ProductReview({ productId }: { productId: string }) {
  const { reviews, isPending, error } = useReviews(productId);

  if (isPending) return <ReviewsSkeleton />;
  if (error) return <InlineError message='Unable to load reviews' />;
  if (!reviews?.length)
    return <EmptyState message='This product has no review yet.' />;

  return (
    <section className='w-full py-8 space-y-6'>
      <h2 className='text-xl font-semibold'>
        Customer Reviews ({reviews.length})
      </h2>

      <div className='space-y-6'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </section>
  );
}

'use client';
import { Separator } from '@/components/ui/separator';
import ReviewForm from '@/features/review/components/ReviewForm';
import { usePendingReviews } from '@/features/review/hooks/usePendingReviews';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function WriteReviewPage() {
  const { pendingReviews, isPending, error } = usePendingReviews();
  const { pendingReviewId } = useParams();

  const navigate = useNavigate();

  if (isPending) return <p>Loading..</p>;
  if (error) <p>{error.message}</p>;

  if (!pendingReviews?.length)
    return <p>You can write review for this product</p>;

  const pendingReview = pendingReviews.find(
    (pendingReview) => pendingReview.id === pendingReviewId
  );

  if (!pendingReview) {
    return <p>You cant review this product</p>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3'>
        <button onClick={() => navigate('/admin/pending-reviews')}>
          <ArrowLeft className='cursor-pointer' />
        </button>
        <h1 className='font-semibold text-lg'>Write a Review</h1>
      </div>

      <Separator />

      <div className='flex items-center gap-4 p-4 border rounded-lg bg-background'>
        <img
          src={pendingReview.imageUrl}
          alt={pendingReview.name}
          className='w-16 h-16 rounded-lg object-cover'
        />
        <div className='flex flex-col'>
          <p className='font-medium text-sm'>{pendingReview.name}</p>
          <p className='text-xs text-muted-foreground'>Purchased item</p>
          <p className='text-xs text-muted-foreground'>
            Purchased on: {format(new Date(pendingReview.purchasedAt), 'PPP')}
          </p>
        </div>
      </div>

      <ReviewForm />
    </div>
  );
}

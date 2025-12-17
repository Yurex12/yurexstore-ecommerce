import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';

import type { PendingReview } from '../types';

export default function PendingReviewCard({
  pendingReview,
}: {
  pendingReview: PendingReview;
}) {
  const navigate = useNavigate();
  return (
    <div className='p-4 border rounded-lg bg-background flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'>
      <div className='flex items-center gap-4'>
        <img
          src={pendingReview.imageUrl}
          alt={pendingReview.name}
          className='w-20 h-20 rounded-md object-cover'
        />
        <div>
          <h3 className='font-medium'>{pendingReview.name}</h3>
          <p className='text-sm text-muted-foreground'>
            Purchased on: {format(new Date(pendingReview.purchasedAt), 'PPP')}
          </p>
        </div>
      </div>

      <div className='flex gap-2 justify-end mt-3 sm:mt-0'>
        <Button
          onClick={() =>
            navigate(`/account/pending-reviews/${pendingReview.id}/write`)
          }
          className='text-sm'
        >
          Write Review
        </Button>
      </div>
    </div>
  );
}

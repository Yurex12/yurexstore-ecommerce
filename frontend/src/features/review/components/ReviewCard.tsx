import { formatDistanceToNow } from 'date-fns';

import StarRating from '@/components/StarRating';
import type { Review } from '../types';

export default function ReviewCard(review: Review) {
  const username = review.user.name;

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
  });

  return (
    <div className='border rounded-xl p-4 space-y-3'>
      <div className='flex items-start justify-between md:flex-row flex-col gap-2'>
        <div className='flex items-start gap-3'>
          <div className='flex items-center justify-center w-10 h-10 bg-slate-800 text-white rounded-full text-sm font-semibold'>
            {initials}
          </div>

          <div className='flex flex-col'>
            <span className='font-semibold text-slate-900'>{username}</span>
            <span className='text-xs text-slate-500'>{timeAgo}</span>
          </div>
        </div>

        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      {review.content && (
        <p className='text-sm text-slate-700 leading-relaxed'>
          {review.content}
        </p>
      )}
    </div>
  );
}

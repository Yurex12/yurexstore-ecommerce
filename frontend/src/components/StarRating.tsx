import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  showRating?: boolean;
};

export default function StarRating({
  rating,
  reviewCount = 0,
  showCount = false,
  showRating = false,
}: StarRatingProps) {
  if (rating === 0) {
    return <p className='text-sm text-slate-500'>No reviews yet</p>;
  }

  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map((star) => {
          const difference = rating - star;

          return (
            <Star
              key={star}
              className={`size-4 md:size-5 ${
                difference >= 0
                  ? 'text-amber-500 fill-amber-500'
                  : difference > -1
                  ? 'text-amber-500 fill-amber-500'
                  : 'text-gray-300'
              }`}
              style={
                difference > -1 && difference < 0
                  ? {
                      clipPath: `inset(0 ${Math.abs(difference) * 100}% 0 0)`,
                    }
                  : undefined
              }
            />
          );
        })}
        {showRating && (
          <span className='text-sm font-semibold text-slate-700 ml-1'>
            {rating.toFixed(1)}
          </span>
        )}
      </div>
      {showCount && (
        <span className='text-sm text-slate-600'>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}

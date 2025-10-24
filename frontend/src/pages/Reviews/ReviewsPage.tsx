import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type PendingReview = {
  id: string;
  name: string;
  image: string;
  purchasedAt: string;
};

export default function PendingReviews() {
  const [items, setItems] = useState<PendingReview[]>([
    {
      id: '1',
      name: 'Nike Air Max Runner',
      image: '/shirt.png',
      purchasedAt: 'Oct 3, 2025',
    },
    {
      id: '2',
      name: 'Wireless Keyboard',
      image: '/shirt.png',
      purchasedAt: 'Oct 1, 2025',
    },
  ]);

  const handleWriteReview = (id: string) => {
    // open modal or navigate to review page
    console.log('Write review for:', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSkip = (id: string) => {
    // mark as skipped
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className='text-center py-12 text-muted-foreground'>
        No pending reviews. 🎉
      </div>
    );
  }

  return (
    <div className='space-y-5'>
      {items.map((item) => (
        <PendingReviewCard
          key={item.id}
          item={item}
          onReview={handleWriteReview}
          onSkip={handleSkip}
        />
      ))}
    </div>
  );
}

function PendingReviewCard({
  item,
  onReview,
  onSkip,
}: {
  item: PendingReview;
  onReview: (id: string) => void;
  onSkip: (id: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      className='
        p-4 border rounded-lg bg-background
        flex flex-col sm:flex-row gap-4
        sm:items-center sm:justify-between
      '
    >
      {/* INFO */}
      <div className='flex items-center gap-4'>
        <img
          src={item.image}
          alt={item.name}
          className='w-20 h-20 rounded-md object-cover'
        />
        <div>
          <h3 className='font-medium'>{item.name}</h3>
          <p className='text-sm text-muted-foreground'>
            Purchased on: {item.purchasedAt}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className='flex gap-2 justify-end mt-3 sm:mt-0'>
        <Button
          onClick={() => navigate(`/account/reviews/${item.id}/write`)}
          className='text-sm'
        >
          Write Review
        </Button>
      </div>
    </div>
  );
}

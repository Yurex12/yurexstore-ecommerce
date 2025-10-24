'use client';
import { useState } from 'react';
import { Star, ArrowLeft, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const product = {
  id: '1',
  name: 'Nike Air Max 270 ',
  image: '/shirt.png',
};

export default function WriteReviewPage() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (!rating || reviewText.trim().length < 10) return;

    // TODO: send review to server
    alert('Submitted!');
  };

  return (
    <div className='h-full flex flex-col bg-background'>
      {/* Header */}
      <div className='flex items-center gap-3 p-4 border-b'>
        <ArrowLeft className='cursor-pointer' />
        <h1 className='font-semibold text-lg'>Write a Review</h1>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto p-4 space-y-6'>
        {/* Product Preview */}
        <div className='flex items-center gap-3'>
          <img
            src={product.image}
            alt={product.name}
            className='w-16 h-16 rounded-lg object-cover'
          />
          <div>
            <p className='font-medium'>{product.name}</p>
            <p className='text-sm text-muted-foreground'>Purchased item</p>
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <p className='text-sm font-medium mb-2'>Your Rating</p>
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((idx) => (
              <Star
                key={idx}
                size={28}
                onClick={() => setRating(idx)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-pointer ${
                  (hovered ?? rating) >= idx
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div>
          <p className='text-sm font-medium mb-2'>Your Review</p>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={6}
            placeholder='What did you like or dislike about the product?'
            className='w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-primary resize-none'
          />
          <p className='text-gray-400 text-xs mt-1'>Minimum 10 characters</p>
        </div>
      </div>

      {/* Sticky Submit Button */}
      <div className='p-4 border-t bg-white'>
        <Button
          onClick={handleSubmit}
          disabled={!rating || reviewText.trim().length < 10}
          className=' px-4
            disabled:opacity-30'
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
}

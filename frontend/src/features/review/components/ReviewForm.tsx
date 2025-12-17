import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { reviewSchema, type ReviewSchema } from '../schema/reviewSchema';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateReview } from '../hooks/useCreateReview';
import { Spinner } from '@/components/ui/spinner';

export default function ReviewForm() {
  const form = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewText: '',
    },
  });

  const { pendingReviewId } = useParams();
  const { createReview, isPending: isCreating } = useCreateReview();

  const [hovered, setHovered] = useState<number | null>(null);
  const navigate = useNavigate();

  function onSubmit(values: ReviewSchema) {
    createReview(
      { ...values, productId: pendingReviewId! },
      {
        onSuccess() {
          form.reset();
          navigate('/account/pending-reviews');
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <Star
                      key={idx}
                      size={28}
                      onClick={() => field.onChange(idx)}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                      className={`cursor-pointer ${
                        (hovered ?? field.value) >= idx
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground/60'
                      }`}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='reviewText'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isCreating}
                  placeholder='What did you like or dislike about the product?'
                  className='w-full resize-none h-40 shadow-none'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button
            type='submit'
            className='flex items-center justify-center w-30'
          >
            {isCreating ? <Spinner /> : <span>Submit Review</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
}

import type { ApiResponseBase } from '@/services/types';

export type PendingReview = {
  id: string;
  name: string;
  imageUrl: string;
  purchasedAt: string;
};

export type GetPendingReviewsResponse = ApiResponseBase & {
  pendingReviews: PendingReview[];
};

export type CreateReviewResponse = {
  productId: string;
  rating: string;
  content?: string;
};

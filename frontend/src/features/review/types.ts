import type { ApiResponseBase } from '@/services/types';

export type PendingReview = {
  id: string;
  name: string;
  imageUrl: string;
  purchasedAt: string;
};

export type Review = {
  id: string;
  content: string | null;
  rating: number;
  user: { name: string };
  createdAt: string;
};

export type GetPendingReviewsResponse = ApiResponseBase & {
  pendingReviews: PendingReview[];
};

export type GetProductReviewsResponse = ApiResponseBase & {
  reviews: Review[];
};

export type CreateReviewResponse = {
  productId: string;
  rating: string;
  content?: string;
};

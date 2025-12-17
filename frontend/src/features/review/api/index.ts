import { api, handleApiError } from '@/services/api';
import type {
  GetPendingReviewsResponse,
  GetProductReviewsResponse,
} from '../types';
import type { ReviewSchema } from '../schema/reviewSchema';
import type { ApiResponseBase } from '@/services/types';

export async function getPendingReviews() {
  try {
    const { data } = await api.get<GetPendingReviewsResponse>(
      `/reviews/pending-reviews`
    );

    return data.pendingReviews;
  } catch (error) {
    handleApiError(error, 'Failed to fetch color');
  }
}

export async function getProductReviews(productId: string) {
  try {
    const { data } = await api.get<GetProductReviewsResponse>(
      `/reviews/${productId}`
    );

    return data.reviews;
  } catch (error) {
    handleApiError(error, 'Failed to fetch color');
  }
}

export async function createReview(
  reviewData: ReviewSchema & { productId: string }
) {
  try {
    const { data } = await api.post<ApiResponseBase>(`/reviews`, reviewData);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch color');
  }
}

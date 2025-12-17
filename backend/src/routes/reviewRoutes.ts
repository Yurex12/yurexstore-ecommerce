import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';

import {
  createReview,
  // createReview,
  // deleteReview,
  getReviews,
  getUserPendingReviews,
} from '../controllers/reviewController';

import { reviewSchema } from '../schemas/reviewSchema';

const router = express.Router();

router.get('/pending-reviews', validateToken, getUserPendingReviews);

router.get('/:productId', validateToken, getReviews);

router.post('/', validateToken, validateData(reviewSchema), createReview);

export default router;

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

router.get('/:productId', validateToken, getReviews);
router.get('/pending-reviews', validateToken, getUserPendingReviews);

router.post('/', validateToken, validateData(reviewSchema), createReview);

export default router;

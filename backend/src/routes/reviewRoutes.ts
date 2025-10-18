import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';

import {
  createReview,
  deleteReview,
  getReviews,
} from '../controllers/reviewController';

import { reviewSchema } from '../schemas/reviewSchema';

const router = express.Router();

router.get('/:productId', getReviews);

router.post('/', validateToken, validateData(reviewSchema), createReview);

router.delete('/:id', validateToken, deleteReview);

export default router;

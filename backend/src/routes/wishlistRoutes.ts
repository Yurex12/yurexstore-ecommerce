import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';
import {
  createWishlistItem,
  getWishlists,
  removeWishlistItem,
} from '../controllers/wishlistControllers';
import { wishlistSchema } from '../schemas/wishlistSchema';

const router = express.Router();

router.get('/', validateToken, getWishlists);

router.post(
  '/',
  validateToken,
  validateData(wishlistSchema),
  createWishlistItem
);

router.delete('/:id', validateToken, removeWishlistItem);

export default router;

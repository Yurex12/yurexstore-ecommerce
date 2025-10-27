import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';
import {
  addItemToCart,
  clearCart,
  getCart,
  removeCartItem,
  removeItemFromCart,
} from '../controllers/cartController';
import { cartSchema } from '../schemas/cartSchema';

const router = express.Router();

router.get('/', getCart);

router.post('/', validateToken, validateData(cartSchema), addItemToCart);

router.patch('/', validateToken, validateData(cartSchema), removeItemFromCart);

router.post('/:cartItemId', validateToken, removeCartItem);

router.delete('/', validateToken, clearCart);

export default router;

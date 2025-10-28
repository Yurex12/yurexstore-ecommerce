import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';
import {
  addItemToCart,
  clearCart,
  decrementCartItem,
  getCart,
  incrementCartItem,
  removeCartItem,
} from '../controllers/cartController';
import { cartSchema } from '../schemas/cartSchema';

const router = express.Router();

router.get('/', validateToken, getCart);

router.post('/', validateToken, validateData(cartSchema), addItemToCart);

router.patch('/increment/:cartItemId', validateToken, incrementCartItem);

router.patch('/decrement/:cartItemId', validateToken, decrementCartItem);

router.delete('/:cartItemId', validateToken, removeCartItem);

router.delete('/', validateToken, clearCart);

export default router;

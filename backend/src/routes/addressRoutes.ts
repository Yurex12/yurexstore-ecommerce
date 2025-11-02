import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';

import { addressSchema } from '../schemas/addressSchema';
import { createAddress, getAddresses } from '../controllers/addressController';

const router = express.Router();

router.get('/', validateToken, getAddresses);

router.post('/', validateToken, validateData(addressSchema), createAddress);

// router.patch('/increment/:cartItemId', validateToken, incrementCartItem);

// router.patch('/decrement/:cartItemId', validateToken, decrementCartItem);

// router.delete('/:cartItemId', validateToken, removeCartItem);

// router.delete('/', validateToken, clearCart);

export default router;

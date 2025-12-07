import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';

import { addressSchema } from '../schemas/addressSchema';
import {
  changeDefaultAddress,
  createAddress,
  deleteAddress,
  getAddresses,
} from '../controllers/addressController';

const router = express.Router();

router.get('/', validateToken, getAddresses);

router.post('/', validateToken, validateData(addressSchema), createAddress);

// router.patch('/increment/:cartItemId', validateToken, incrementCartItem);

router.patch('/:id', validateToken, changeDefaultAddress);

// router.delete('/:cartItemId', validateToken, removeCartItem);

router.delete('/:id', validateToken, deleteAddress);

export default router;

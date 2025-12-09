import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';

import {
  createAddressSchema,
  updateAddressSchema,
} from '../schemas/addressSchema';
import {
  changeDefaultAddress,
  createAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from '../controllers/addressController';

const router = express.Router();

router.get('/', validateToken, getAddresses);

router.get('/:id', validateToken, getAddress);

router.post(
  '/',
  validateToken,
  validateData(createAddressSchema),
  createAddress
);

router.put(
  '/:id',
  validateToken,
  validateData(updateAddressSchema),
  updateAddress
);

router.patch('/:id', validateToken, changeDefaultAddress);

router.delete('/:id', validateToken, deleteAddress);

export default router;

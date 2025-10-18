import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateData } from '../middlewares/validation';

import { productSchema, productUpdateSchema } from '../schemas/productSchema';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', validateToken, getProduct);

router.post(
  '/',
  validateToken,
  requireAdmin,
  validateData(productSchema),
  createProduct
);

router.patch(
  '/:id',
  validateToken,
  requireAdmin,
  validateData(productUpdateSchema),
  updateProduct
);

router.delete('/:id', validateToken, requireAdmin, deleteProduct);

export default router;

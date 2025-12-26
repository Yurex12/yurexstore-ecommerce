import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateData, validateQuery } from '../middlewares/validation';

import { productSchema, similarProductsSchema } from '../schemas/productSchema';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getFeaturedProducts,
  getSearchProducts,
  getSimilarProduct,
  updateProduct,
} from '../controllers/productController';
import { productEditSchema } from '../schemas/productEditSchema';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured-products', getFeaturedProducts);

router.get(
  '/similar-products',
  validateQuery(similarProductsSchema),
  getSimilarProduct
);
router.get('/search', getSearchProducts);

router.get('/:id', getProduct);

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
  validateData(productEditSchema),
  updateProduct
);

router.delete('/:id', validateToken, requireAdmin, deleteProduct);

export default router;

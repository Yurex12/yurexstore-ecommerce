import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { productSchema } from '../schemas/productSchema';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', validateToken, getProduct);

router.post('/', validateToken, validateData(productSchema), createProduct);

router.put('/:id', validateToken, validateData(productSchema), updateProduct);

router.delete('/:id', validateToken, deleteProduct);

export default router;

import express from 'express';

import { deleteCategories } from '../controllers/categoryController';
import { deleteColors } from '../controllers/colorController';
import {
  cancelOrder,
  completeOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/orderController';
import { deleteProducts } from '../controllers/productController';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import {
  categoriesDeleteSchema,
  colorsDeleteSchema,
  productsDeleteSchema,
} from '../schemas/adminSchema';
import { getUsersData } from '../controllers/authController';

const router = express.Router();

router.use(validateToken);
router.use(requireAdmin);

// Order
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/complete', completeOrder);
router.patch('/orders/:id/cancel', cancelOrder);

// Product
router.delete('/products', validateData(productsDeleteSchema), deleteProducts);

// Category
router.delete(
  '/categories',
  validateData(categoriesDeleteSchema),
  deleteCategories
);

// Color
router.delete('/colors', validateData(colorsDeleteSchema), deleteColors);

// Users

router.get('/users', getUsersData);

export default router;

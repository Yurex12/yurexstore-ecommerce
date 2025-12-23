import express from 'express';

import { deleteCategories } from '../controllers/categoryController';
import { deleteColors } from '../controllers/colorController';
import {
  cancelOrder,
  completeOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/orderController';
import {
  deleteProducts,
  getAdminProducts,
} from '../controllers/productController';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import {
  categoriesDeleteSchema,
  colorsDeleteSchema,
  productsDeleteSchema,
} from '../schemas/adminSchema';
import { getUsersData } from '../controllers/authController';
import {
  getChartData,
  getMetrics,
  getTopProducts,
} from '../controllers/analyticsController';

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
router.get('/products', getAdminProducts);

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

// analytics

router.get('/analytics/metrics', getMetrics);
router.get('/analytics/chart', getChartData);
router.get('/analytics/top-products', getTopProducts);

export default router;

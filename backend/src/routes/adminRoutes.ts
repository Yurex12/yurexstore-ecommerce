import express from 'express';

import {
  cancelOrder,
  completeOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/orderController';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);
router.use(requireAdmin);

// Order
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/complete', completeOrder);
router.patch('/orders/:id/cancel', cancelOrder);

export default router;

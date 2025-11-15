import express from 'express';

import { getAllOrders, getOrderById } from '../controllers/orderController';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);
router.use(requireAdmin);

// Order
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);

export default router;

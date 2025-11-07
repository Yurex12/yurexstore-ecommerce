import express from 'express';

import { validateData } from '../middlewares/validation';

import { validateToken } from '../middlewares/validateTokenHandler';

import {
  createOrder,
  getOrder,
  getOrders,
} from '../controllers/orderController';

import { OrderSchema } from '../schemas/orderSchema';

const router = express.Router();

router.get('/', validateToken, getOrders);

router.get('/:id', validateToken, getOrder);

router.post('/', validateToken, validateData(OrderSchema), createOrder);

export default router;

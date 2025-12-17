import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { OrderSchema } from '../schemas/orderSchema';

const router = express.Router();

router.post(
  '/create-payment-intent',
  validateToken,
  validateData(OrderSchema),
  createPaymentIntent
);

export default router;

import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import {
  createColor,
  deleteColor,
  getColors,
  updateColor,
} from '../controllers/colorController';

import { validateData } from '../middlewares/validation';
import { requireAdmin } from '../middlewares/requireAdmin';

import { colorSchema, updateColorSchema } from '../schemas/colorSchema';

const router = express.Router();

router.get('/', getColors);

router.post(
  '/',
  validateToken,
  requireAdmin,
  validateData(colorSchema),
  createColor
);

router.patch(
  '/:id',
  validateToken,
  requireAdmin,
  validateData(updateColorSchema),
  updateColor
);

router.delete('/:id', validateToken, requireAdmin, deleteColor);

export default router;

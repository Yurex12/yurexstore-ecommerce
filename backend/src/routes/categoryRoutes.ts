import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import { requireAdmin } from '../middlewares/requireAdmin';
import { validateData } from '../middlewares/validation';

import { categorySchema } from '../schemas/categorySchema';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', getCategories);

router.get('/:id', validateToken, getCategory);

router.post(
  '/',
  validateToken,
  requireAdmin,
  validateData(categorySchema),
  createCategory
);

router.patch(
  '/:id',
  validateToken,
  requireAdmin,
  validateData(categorySchema),
  updateCategory
);

router.delete('/:id', validateToken, requireAdmin, deleteCategory);

export default router;

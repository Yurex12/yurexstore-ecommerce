import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { categorySchema } from '../schemas/categorySchema';

const router = express.Router();

router.get('/', getCategories);

router.get('/:id', validateToken, getCategory);

router.post('/', validateToken, validateData(categorySchema), createCategory);

router.put('/:id', validateToken, validateData(categorySchema), updateCategory);

router.delete('/:id', validateToken, deleteCategory);

export default router;

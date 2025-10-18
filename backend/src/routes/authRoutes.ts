import express from 'express';

import {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserPassword,
} from '../controllers/authController';
import { validateData } from '../middlewares/validation';
import {
  loginSchema,
  registerSchema,
  updatePasswordSchema,
} from '../schemas/authSchema';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.post('/register', validateData(registerSchema), registerUser);

router.post('/login', validateData(loginSchema), loginUser);

router.post('/logout', logoutUser);

router.get('/users/:id', validateToken, getUserData);

router.patch(
  'users/:id/update-password',
  validateToken,
  validateData(updatePasswordSchema),
  updateUserPassword
);

export default router;

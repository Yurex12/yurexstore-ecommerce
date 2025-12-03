import express from 'express';

import {
  getUserData,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
  updateUserPassword,
} from '../controllers/authController';
import { validateData } from '../middlewares/validation';
import {
  googleLoginSchema,
  loginSchema,
  registerSchema,
  updatePasswordSchema,
} from '../schemas/authSchema';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.post('/register', validateData(registerSchema), registerUser);

router.post('/login', validateData(loginSchema), loginUser);

router.post('/google-login', validateData(googleLoginSchema), googleLogin);

router.post('/logout', logoutUser);

router.get('/user', validateToken, getUserData);

router.patch(
  '/update-password',
  validateToken,
  validateData(updatePasswordSchema),
  updateUserPassword
);

export default router;

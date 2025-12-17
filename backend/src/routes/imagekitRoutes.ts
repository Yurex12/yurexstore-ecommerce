import express from 'express';
import { getAuth } from '../controllers/imagekitController';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.get('/auth', validateToken, getAuth);

export default router;

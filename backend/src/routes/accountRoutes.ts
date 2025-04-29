import express from 'express';
import { getUser } from '../controllers/accountControllers';
import { bearerAuth } from '../middlewares/bearerAuth';

const router = express.Router();

router.get('/users', getUser);

export default router
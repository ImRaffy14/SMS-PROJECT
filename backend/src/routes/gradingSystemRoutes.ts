import express from 'express';
import {
    getGradingSystem,
    createGradingSystem,
    deleteGradingSystem,
}  from '../controllers/gradingSystemController';

const router = express.Router();

router.get('/', getGradingSystem);
router.post('/addGradingSystem', createGradingSystem);
router.delete('/deleteGradingSystem/:id', deleteGradingSystem);

export default router;
import exporess from 'express';
import { createEmailController, deleteEmailController, editEmailController, getEmailController } from '../controllers/emailController';

const router = exporess.Router();

router.get('/', getEmailController);
router.post('/addEmailTemplate', createEmailController);
router.put('/editEmailTemplate/:id', editEmailController);
router.delete('/deleteEmailTemplate/:id', deleteEmailController);

export default router;
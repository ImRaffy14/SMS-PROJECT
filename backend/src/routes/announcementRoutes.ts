import { Router } from 'express';
import { 
    getAnnouncement,
    createAnnouncement,
    editAnnouncement,
    deleteAnnouncement
} from './../controllers/announcementController';

const router = Router();

router.get('/', getAnnouncement);
router.post('/createAnnouncement', createAnnouncement);
router.put('/editAnnouncement/:id', editAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

export default router;
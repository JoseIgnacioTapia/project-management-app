import { Router } from 'express';
import { getTask, postTask, patchTask } from '../controllers/tasks';
import { authorizeRoles } from '../middlewares/authorizeRole';

const router = Router();

router.get('/', getTask);
router.post('/', authorizeRoles('ADMIN'), postTask);
router.patch('/:id', patchTask);

export default router;

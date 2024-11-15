import { Router } from 'express';
import { getTasksByProject, postTask, patchTask } from '../controllers/tasks';
import { authorizeRoles } from '../middlewares/authorizeRole';

const router = Router();

router.get('/', getTasksByProject);
router.post('/', authorizeRoles('ADMIN'), postTask);
router.patch('/:id', patchTask);

export default router;

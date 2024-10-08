import { Router } from 'express';
import { getTask, postTask, patchTask } from '../controllers/tasks';

const router = Router();

router.get('/', getTask);
router.post('/', postTask);
router.patch('/:id', patchTask);

export default router;

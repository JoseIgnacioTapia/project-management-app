import { Router } from 'express';
import {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  putProject,
} from '../controllers/projects';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', postProject);
router.put('/:id', putProject);
router.delete('/:id', deleteProject);

export default router;

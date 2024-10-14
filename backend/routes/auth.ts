import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { validateAuth } from '../middlewares/validateAuth';

const router = Router();

router.post('/login', validateAuth, login);

router.post('/register', validateAuth, register);

export default router;

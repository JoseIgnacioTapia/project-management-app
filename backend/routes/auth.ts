import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { validateAuth } from '../middlewares/validateAuth';
import { registerSchema, loginSchema } from '../schema/authSchema';

const router = Router();

router.post('/login', validateAuth(loginSchema), login);

router.post('/register', validateAuth(registerSchema), register);

export default router;

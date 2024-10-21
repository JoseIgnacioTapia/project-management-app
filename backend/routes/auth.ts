import { Router } from 'express';
import { validateAuth } from '../middlewares/validateAuth';
import { registerSchema, loginSchema } from '../schema/authSchema';
import { login, register, logout } from '../controllers/auth';

const router = Router();

router.post('/login', validateAuth(loginSchema), login);

router.post('/register', validateAuth(registerSchema), register);

router.post('/logout', logout);

export default router;

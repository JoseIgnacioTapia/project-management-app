import { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from './authenticateJWT';

const excludeAuthPaths = ['/auth/login', '/auth/register', '/'];

export const authenticateJWTUnless = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (excludeAuthPaths.includes(req.path)) {
    return next();
  }

  authenticateJWT(req, res, next);
};

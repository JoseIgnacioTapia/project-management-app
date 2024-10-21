import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user && typeof req.user !== 'string' && 'role' in req.user) {
      const { role } = req.user as JwtPayload;

      if (!allowedRoles.includes(role as string)) {
        res.status(403).json({
          message: 'You do not have permission to perform this action.',
        });
        return;
      }

      next();
    } else {
      res.status(403).json({
        message: 'Invalid token. User role not found',
      });
      return;
    }
  };
};

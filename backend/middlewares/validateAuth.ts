import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { authSchema } from '../schema/authSchema';

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    authSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

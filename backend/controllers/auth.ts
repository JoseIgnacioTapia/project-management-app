import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  console.log('Login controller called');
  res.json({ message: 'Login successful' });
};

export const register = (req: Request, res: Response) => {
  console.log('Register controller called');
  res.json({ message: 'Register successful' });
};

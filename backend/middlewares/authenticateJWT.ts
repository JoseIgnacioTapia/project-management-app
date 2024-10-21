import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided' });
    return;
  }

  try {
    const secretKey = process.env.SECRETORPRIVATEKEY;

    if (!secretKey) {
      throw new Error('Secret key is not defined in enviroment variables');
    }

    const decoded = jwt.verify(token, secretKey) as string | JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

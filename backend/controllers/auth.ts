import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

export const login = (req: Request, res: Response) => {
  console.log('Login controller called');
  res.json({ message: 'Login successful' });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log('Register controller called');

  try {
    console.log('Entered try');

    const { email, password, name } = req.body;
    console.log('Received data:', { email, password, name });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log('Existing user', existingUser);

    if (existingUser) {
      res.status(400).json({
        message: 'The e-mail address is already registered',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password', hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER',
      },
    });
    console.log('New user created', newUser);

    res.status(201).json({
      message: 'User successfully registered',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log('Error occurred', error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: 'An error occurred while registering the user',
    });
  }
};

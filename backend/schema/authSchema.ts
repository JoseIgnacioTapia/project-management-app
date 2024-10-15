import { z } from 'zod';

export const authSchema = z.object({
  name: z.string().min(1, { message: 'The name is required' }),
  email: z.string().email({ message: 'Invalid mail' }),
  password: z
    .string()
    .min(6, { message: 'The password must be at least 6 characters long' })
    .max(100, { message: 'Password cannot exceed 100 characters' }),
});

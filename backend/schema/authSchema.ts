import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(100, { message: 'La contraseña no puede exceder los 100 caracteres' }),
});

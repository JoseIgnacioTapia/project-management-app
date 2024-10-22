import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'The start date is not valid',
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'The end date is not valid',
  }),
  users: z.array(z.string()).optional(),
  tasks: z.array(
    z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description task is required'),
      state: z.enum(['pending', 'in progress', 'completed']).optional(),
      assigned_to: z.string().optional(),
    })
  ),
});

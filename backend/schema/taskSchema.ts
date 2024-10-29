import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  state: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
  project_id: z
    .number()
    .int()
    .positive('Project ID must be a positive integer'),
  assigned_to: z.string().min(1, 'Assigned user ID is required'),
});

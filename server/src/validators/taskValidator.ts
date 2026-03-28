import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(3, "Mínimo 3 caracteres"),
    priority: z.enum(['low', 'medium', 'high'])
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
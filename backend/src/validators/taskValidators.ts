import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    priority: z.enum(['ALTA', 'MEDIA', 'BAJA']).default('MEDIA'),
})

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    priority: z.enum(['ALTA', 'MEDIA', 'BAJA']).optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
})

export const taskIdSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
})

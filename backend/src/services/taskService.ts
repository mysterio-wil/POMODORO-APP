import { TaskRepository } from '../repositories/taskRepository'
import { AppError } from '../errors/AppError'
import { Priority, TaskStatus } from '@prisma/client'

export class TaskService {
    constructor(private taskRepo: TaskRepository) { }

    async getAllTasks(userId: number) {
        return this.taskRepo.findAllByUserId(userId)
    }

    async getTaskById(id: number, userId: number) {
        const task = await this.taskRepo.findById(id, userId)
        if (!task) {
            throw new AppError('Task not found', 404)
        }
        return task
    }

    async createTask(
        userId: number,
        data: {
            title: string
            description?: string
            priority?: Priority
        }
    ) {
        return this.taskRepo.create({
            title: data.title,
            description: data.description,
            priority: data.priority || 'MEDIA',
            userId,
        })
    }

    async updateTask(
        id: number,
        userId: number,
        data: {
            title?: string
            description?: string
            priority?: Priority
            status?: TaskStatus
        }
    ) {
        // Verificar que la tarea existe y pertenece al usuario
        await this.getTaskById(id, userId)
        return this.taskRepo.update(id, data)
    }

    async deleteTask(id: number, userId: number) {
        // Verificar que la tarea existe y pertenece al usuario
        await this.getTaskById(id, userId)
        await this.taskRepo.delete(id)
    }
}

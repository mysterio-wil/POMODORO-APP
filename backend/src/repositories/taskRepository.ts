import { PrismaClient, Task, Priority, TaskStatus } from '@prisma/client'

export class TaskRepository {
    constructor(private prisma: PrismaClient) { }

    async findAllByUserId(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        })
    }

    async findById(id: number, userId: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id, userId },
        })
    }

    async create(data: {
        title: string
        description?: string
        priority: Priority
        userId: number
    }): Promise<Task> {
        return this.prisma.task.create({
            data: {
                ...data,
                status: 'PENDING',
            },
        })
    }

    async update(
        id: number,
        data: {
            title?: string
            description?: string
            priority?: Priority
            status?: TaskStatus
        }
    ): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        })
    }

    async delete(id: number): Promise<void> {
        await this.prisma.task.delete({ where: { id } })
    }
}

import { PrismaClient, Session } from '@prisma/client'

export class SessionRepository {
    constructor(private prisma: PrismaClient) { }

    async create(data: {
        userId: number
        taskId?: number
        startTime: Date
    }): Promise<Session> {
        return this.prisma.session.create({ data })
    }

    async findById(id: number, userId: number): Promise<Session | null> {
        return this.prisma.session.findFirst({
            where: { id, userId },
        })
    }

    async update(
        id: number,
        data: { endTime: Date; duration: number }
    ): Promise<Session> {
        return this.prisma.session.update({
            where: { id },
            data,
        })
    }

    async findAllByUserId(userId: number): Promise<Session[]> {
        return this.prisma.session.findMany({
            where: { userId },
            orderBy: { startTime: 'desc' },
        })
    }
}

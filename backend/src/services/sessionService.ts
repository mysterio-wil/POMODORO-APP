import { SessionRepository } from '../repositories/sessionRepository'
import { AppError } from '../errors/AppError'

export class SessionService {
    constructor(private sessionRepo: SessionRepository) { }

    async startSession(userId: number, taskId?: number) {
        return this.sessionRepo.create({
            userId,
            taskId,
            startTime: new Date(),
        })
    }

    async endSession(id: number, userId: number) {
        const session = await this.sessionRepo.findById(id, userId)
        if (!session) {
            throw new AppError('Session not found', 404)
        }

        if (session.endTime) {
            throw new AppError('Session already ended', 400)
        }

        const endTime = new Date()
        const duration = Math.floor(
            (endTime.getTime() - session.startTime.getTime()) / 1000
        )

        return this.sessionRepo.update(id, { endTime, duration })
    }

    async getAllSessions(userId: number) {
        return this.sessionRepo.findAllByUserId(userId)
    }
}

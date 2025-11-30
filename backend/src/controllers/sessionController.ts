import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { SessionService } from '../services/sessionService'
import { asyncHandler } from '../utils/asyncHandler'

export class SessionController {
    constructor(private sessionService: SessionService) { }

    start = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const { taskId } = req.body
        const session = await this.sessionService.startSession(userId, taskId)
        res.status(201).json(session)
    })

    end = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const id = parseInt(req.params.id)
        const session = await this.sessionService.endSession(id, userId)
        res.json(session)
    })

    getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const sessions = await this.sessionService.getAllSessions(userId)
        res.json(sessions)
    })
}

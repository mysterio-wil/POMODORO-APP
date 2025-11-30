import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { AuthService } from '../services/authService'
import { asyncHandler } from '../utils/asyncHandler'

export class AuthController {
    constructor(private authService: AuthService) { }

    register = asyncHandler(async (req: AuthRequest, res: Response) => {
        const result = await this.authService.register(req.body)
        res.status(201).json(result)
    })

    login = asyncHandler(async (req: AuthRequest, res: Response) => {
        const result = await this.authService.login(req.body)
        res.json(result)
    })
}

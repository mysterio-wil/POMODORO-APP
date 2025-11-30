import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { TaskService } from '../services/taskService'
import { asyncHandler } from '../utils/asyncHandler'

export class TaskController {
    constructor(private taskService: TaskService) { }

    getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const tasks = await this.taskService.getAllTasks(userId)
        res.json(tasks)
    })

    getById = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const id = parseInt(req.params.id)
        const task = await this.taskService.getTaskById(id, userId)
        res.json(task)
    })

    create = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const task = await this.taskService.createTask(userId, req.body)
        res.status(201).json(task)
    })

    update = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const id = parseInt(req.params.id)
        const task = await this.taskService.updateTask(id, userId, req.body)
        res.json(task)
    })

    delete = asyncHandler(async (req: AuthRequest, res: Response) => {
        const userId = req.user!.id
        const id = parseInt(req.params.id)
        await this.taskService.deleteTask(id, userId)
        res.status(204).send()
    })
}

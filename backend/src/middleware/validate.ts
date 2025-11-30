import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validateBody(schema: ZodSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
}

export function validateParams(schema: ZodSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.parseAsync(req.params)
            req.params = validated as typeof req.params
            next()
        } catch (error) {
            next(error)
        }
    }
}

export function validateQuery(schema: ZodSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.parseAsync(req.query)
            req.query = validated as typeof req.query
            next()
        } catch (error) {
            next(error)
        }
    }
}

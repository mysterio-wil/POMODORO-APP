import { Request, Response, NextFunction } from 'express'
import { AppError } from './AppError'
import { ZodError } from 'zod'

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('Error:', err)

    // Error personalizado de la aplicación
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
        })
    }

    // Error de validación con Zod
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: err.format(),
        })
    }

    // Error de Prisma
    if (err && typeof err === 'object' && 'code' in err) {
        const prismaError = err as { code: string }
        if (prismaError.code === 'P2025') {
            return res.status(404).json({ error: 'Resource not found' })
        }
        if (prismaError.code === 'P2002') {
            return res.status(409).json({ error: 'Resource already exists' })
        }
    }

    // Error genérico
    res.status(500).json({
        error: 'Internal server error',
    })
}

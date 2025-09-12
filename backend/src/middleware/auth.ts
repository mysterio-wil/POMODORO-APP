import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '../utils/auth'

export interface UserPayload extends JwtPayload {
  id: number
}

export interface AuthRequest extends Request {
  user?: UserPayload
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = header.split(' ')[1]
  try {
    const decoded = verifyToken(token) as UserPayload
    req.user = decoded
    next()
  } catch (err) {
    console.error('Error de token:', err)
    return res.status(401).json({ error: 'Invalid token' })
  }
}

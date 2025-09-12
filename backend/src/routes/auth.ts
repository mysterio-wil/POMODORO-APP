import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { hashPassword, comparePassword, generateToken } from '../utils/auth'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function createAuthRouter(prisma: PrismaClient) {
  const router = Router()

  // Registro
  router.post('/register', async (req, res) => {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.format() })

    try {
      const existing = await prisma.user.findUnique({
        where: { email: parsed.data.email },
      })
      if (existing)
        return res.status(400).json({ error: 'Email already in use' })

      const hash = await hashPassword(parsed.data.password)
      const user = await prisma.user.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          passwordHash: hash,
        },
      })

      const token = generateToken({ id: user.id, email: user.email })
      res.status(201).json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Login
  router.post('/login', async (req, res) => {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.format() })

    try {
      const user = await prisma.user.findUnique({
        where: { email: parsed.data.email },
      })
      if (!user) return res.status(400).json({ error: 'Invalid credentials' })

      const valid = await comparePassword(
        parsed.data.password,
        user.passwordHash
      )
      if (!valid) return res.status(400).json({ error: 'Invalid credentials' })

      const token = generateToken({ id: user.id, email: user.email })
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  return router
}

import { UserRepository } from '../repositories/userRepository'
import { hashPassword, comparePassword, generateToken } from '../utils/auth'
import { AppError } from '../errors/AppError'

export class AuthService {
    constructor(private userRepo: UserRepository) { }

    async register(data: { name: string; email: string; password: string }) {
        // Verificar si el email ya existe
        const existing = await this.userRepo.findByEmail(data.email)
        if (existing) {
            throw new AppError('Email already in use', 400)
        }

        // Hashear contraseña
        const passwordHash = await hashPassword(data.password)

        // Crear usuario
        const user = await this.userRepo.create({
            name: data.name,
            email: data.email,
            passwordHash,
        })

        // Generar token
        const token = generateToken({ id: user.id, email: user.email })

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        }
    }

    async login(data: { email: string; password: string }) {
        // Buscar usuario
        const user = await this.userRepo.findByEmail(data.email)
        if (!user) {
            throw new AppError('Invalid credentials', 400)
        }

        // Verificar contraseña
        const valid = await comparePassword(data.password, user.passwordHash)
        if (!valid) {
            throw new AppError('Invalid credentials', 400)
        }

        // Generar token
        const token = generateToken({ id: user.id, email: user.email })

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        }
    }
}

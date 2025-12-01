export interface Session {
    id: number
    startTime: string
    endTime?: string
    duration?: number
    taskId?: number
    userId: number
    createdAt: string
}

export interface CreateSessionDTO {
    taskId?: number
}

export interface SessionWithTask extends Session {
    task?: {
        id: number
        title: string
    }
}

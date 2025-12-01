export type Priority = 'ALTA' | 'MEDIA' | 'BAJA'
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE'

export interface Task {
    id: number
    title: string
    description?: string
    priority: Priority
    status: TaskStatus
    userId: number
    createdAt: string
    updatedAt: string
}

export interface CreateTaskDTO {
    title: string
    description?: string
    priority?: Priority
}

export interface UpdateTaskDTO {
    title?: string
    description?: string
    priority?: Priority
    status?: TaskStatus
}

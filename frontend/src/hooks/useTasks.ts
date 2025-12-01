import { useState, useEffect, useCallback } from 'react'
import * as taskService from '../services/taskService'
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task.types'

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTasks = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await taskService.getTasks()
            setTasks(data)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error fetching tasks'
            setError(message)
        } finally {
            setLoading(false)
        }
    }, [])

    const createTask = useCallback(async (data: CreateTaskDTO) => {
        setLoading(true)
        setError(null)
        try {
            const newTask = await taskService.createTask(data)
            setTasks((prev) => [newTask, ...prev])
            return newTask
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error creating task'
            setError(message)
            throw err
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
    }
}

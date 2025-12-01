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
        } finally {
            setLoading(false)
        }
    }, [])

    const updateTask = useCallback(async (id: number, data: UpdateTaskDTO) => {
        setLoading(true)
        setError(null)
        try {
            const updated = await taskService.updateTask(id.toString(), data)
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
            return updated
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error updating task'
            setError(message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const deleteTask = useCallback(async (id: number) => {
        setLoading(true)
        setError(null)
        try {
            await taskService.deleteTask(id.toString())
            setTasks((prev) => prev.filter((t) => t.id !== id))
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error deleting task'
            setError(message)
            throw err
        } finally {
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

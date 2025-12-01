import { useState, useEffect, useCallback, useRef } from 'react'

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak'
export type TimerStatus = 'idle' | 'running' | 'paused'

interface PomodoroSettings {
    workDuration: number // en minutos
    shortBreakDuration: number
    longBreakDuration: number
    sessionsUntilLongBreak: number
}

const DEFAULT_SETTINGS: PomodoroSettings = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
}

export function usePomodoro(settings: PomodoroSettings = DEFAULT_SETTINGS) {
    const [mode, setMode] = useState<PomodoroMode>('work')
    const [status, setStatus] = useState<TimerStatus>('idle')
    const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60) // en segundos
    const [completedSessions, setCompletedSessions] = useState(0)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Obtener duración según el modo
    const getDuration = useCallback((currentMode: PomodoroMode) => {
        switch (currentMode) {
            case 'work':
                return settings.workDuration * 60
            case 'shortBreak':
                return settings.shortBreakDuration * 60
            case 'longBreak':
                return settings.longBreakDuration * 60
        }
    }, [settings])

    // Iniciar timer
    const start = useCallback(() => {
        setStatus('running')
    }, [])

    // Pausar timer
    const pause = useCallback(() => {
        setStatus('paused')
    }, [])

    // Resetear timer
    const reset = useCallback(() => {
        setStatus('idle')
        setTimeLeft(getDuration(mode))
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [mode, getDuration])

    // Cambiar modo
    const switchMode = useCallback((newMode: PomodoroMode) => {
        setMode(newMode)
        setTimeLeft(getDuration(newMode))
        setStatus('idle')
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [getDuration])

    // Saltar al siguiente modo
    const skipToNext = useCallback(() => {
        if (mode === 'work') {
            const nextSessions = completedSessions + 1
            setCompletedSessions(nextSessions)

            if (nextSessions % settings.sessionsUntilLongBreak === 0) {
                switchMode('longBreak')
            } else {
                switchMode('shortBreak')
            }
        } else {
            switchMode('work')
        }
    }, [mode, completedSessions, settings.sessionsUntilLongBreak, switchMode])

    // Efecto para el countdown
    useEffect(() => {
        if (status === 'running') {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Timer completado
                        setStatus('idle')

                        // Notificación
                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification('Pomodoro Timer', {
                                body: mode === 'work'
                                    ? 'Work session completed! Time for a break.'
                                    : 'Break completed! Ready to work?',
                                icon: '/favicon.ico',
                            })
                        }

                        // Auto-switch al siguiente modo
                        if (mode === 'work') {
                            const nextSessions = completedSessions + 1
                            setCompletedSessions(nextSessions)

                            if (nextSessions % settings.sessionsUntilLongBreak === 0) {
                                setMode('longBreak')
                                return settings.longBreakDuration * 60
                            } else {
                                setMode('shortBreak')
                                return settings.shortBreakDuration * 60
                            }
                        } else {
                            setMode('work')
                            return settings.workDuration * 60
                        }
                    }
                    return prev - 1
                })
            }, 1000)

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }
            }
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [status, mode, completedSessions, settings])

    // Formatear tiempo para display
    const formatTime = useCallback(() => {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }, [timeLeft])

    // Progreso en porcentaje
    const progress = useCallback(() => {
        const total = getDuration(mode)
        return ((total - timeLeft) / total) * 100
    }, [timeLeft, mode, getDuration])

    return {
        mode,
        status,
        timeLeft,
        completedSessions,
        formatTime,
        progress,
        start,
        pause,
        reset,
        switchMode,
        skipToNext,
    }
}

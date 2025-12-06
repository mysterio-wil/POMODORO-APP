import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { usePomodoro as usePomodoroHook } from '../hooks/usePomodoro'
import type { PomodoroMode, TimerStatus } from '../hooks/usePomodoro'

interface PomodoroContextType {
  mode: PomodoroMode
  status: TimerStatus
  formatTime: () => string
  completedSessions: number
  start: () => void
  pause: () => void
  reset: () => void
  switchMode: (newMode: PomodoroMode) => void
  skipToNext: () => void
  progress: () => number
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
)

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const pomodoro = usePomodoroHook()

  return (
    <PomodoroContext.Provider value={pomodoro}>
      {children}
    </PomodoroContext.Provider>
  )
}

export function usePomodoro() {
  const context = useContext(PomodoroContext)
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider')
  }
  return context
}

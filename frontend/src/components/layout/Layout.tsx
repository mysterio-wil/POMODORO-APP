import type { ReactNode } from 'react'
import { usePomodoro } from '../../context/PomodoroContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { mode } = usePomodoro()

  // Colores según el modo
  const backgrounds = {
    work: 'from-[#d95550] to-[#c94843]',           // Rojo (Pomodoro)
    shortBreak: 'from-[#38b2ac] to-[#2c9a8f]',     // Teal (Short Break)
    longBreak: 'from-[#5b9bd5] to-[#4a8cc7]',      // Azul (Long Break)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${backgrounds[mode]} transition-colors duration-500`}>
      {children}
    </div>
  )
}

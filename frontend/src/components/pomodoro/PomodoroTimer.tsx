import { usePomodoro } from '../../context/PomodoroContext'

export default function PomodoroTimer() {
  const {
    mode,
    status,
    formatTime,
    completedSessions,
    start,
    pause,
    switchMode,
  } = usePomodoro()

  // Colores del tab activo - MÁS SUTILES (solo ligeramente más oscuros)
  const activeTabColors = {
    work: 'bg-[#c15c58]',              // Rojo ligeramente más oscuro
    shortBreak: 'bg-[#2c9a8f]',        // Teal ligeramente más oscuro
    longBreak: 'bg-[#4a8cc7]',         // Azul ligeramente más oscuro
  }

  // Colores del texto del botón START/PAUSE según el modo
  const buttonTextColors = {
    work: '#d95550',                   // Rojo (Pomodoro)
    shortBreak: '#38b2ac',             // Teal (Short Break)
    longBreak: '#5b9bd5',              // Azul (Long Break)
  }

  return (
    <div className="w-full">
      {/* Timer Card - BLANCO TRANSPARENTE para todos los modos */}
      <div className="bg-white/10 rounded-xl p-5 md:p-7 transition-colors duration-500">
        {/* Mode Tabs */}
        <div className="flex justify-center gap-2 mb-5">
          <button
            onClick={() => switchMode('work')}
            className={`px-3 py-1.5 text-sm md:text-base rounded-md transition-all whitespace-nowrap ${mode === 'work'
                ? `${activeTabColors.work} text-white font-bold`
                : 'text-white/90 hover:text-white hover:bg-white/20 font-normal'
              }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-3 py-1.5 text-sm md:text-base rounded-md transition-all whitespace-nowrap ${mode === 'shortBreak'
                ? `${activeTabColors.shortBreak} text-white font-bold`
                : 'text-white/90 hover:text-white hover:bg-white/20 font-normal'
              }`}
          >
            Short Break
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-3 py-1.5 text-sm md:text-base rounded-md transition-all whitespace-nowrap ${mode === 'longBreak'
                ? `${activeTabColors.longBreak} text-white font-bold`
                : 'text-white/90 hover:text-white hover:bg-white/20 font-normal'
              }`}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-5">
          <div className="text-8xl md:text-9xl font-bold text-white tracking-tighter leading-none">
            {formatTime()}
          </div>
        </div>

        {/* Start/Pause Button - Color de texto dinámico */}
        <div className="flex justify-center">
          <button
            onClick={() => (status === 'running' ? pause() : start())}
            style={{ color: buttonTextColors[mode] }}
            className="w-full md:w-auto px-14 md:px-18 py-4 md:py-5 bg-white text-xl md:text-2xl font-bold rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
          >
            {status === 'running' ? 'PAUSE' : 'START'}
          </button>
        </div>
      </div>

      {/* Session Info */}
      <div className="text-center mt-4 text-white">
        <div className="text-lg md:text-xl font-semibold">#{completedSessions + 1}</div>
        <div className="text-base md:text-lg opacity-90">Time to focus!</div>
      </div>
    </div>
  )
}

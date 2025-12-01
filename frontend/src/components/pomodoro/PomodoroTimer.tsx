import { useEffect } from 'react'
import { usePomodoro } from '../../hooks/usePomodoro'

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

    // Solicitar permiso para notificaciones
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }, [])

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="text-center space-y-6 md:space-y-8">
                {/* Mode Tabs */}
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => switchMode('work')}
                        className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all ${mode === 'work'
                                ? 'bg-white/20 backdrop-blur-sm text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Pomodoro
                    </button>
                    <button
                        onClick={() => switchMode('shortBreak')}
                        className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all ${mode === 'shortBreak'
                                ? 'bg-white/20 backdrop-blur-sm text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => switchMode('longBreak')}
                        className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all ${mode === 'longBreak'
                                ? 'bg-white/20 backdrop-blur-sm text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Long Break
                    </button>
                </div>

                {/* Timer Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Timer Display */}
                    <div className="text-8xl md:text-9xl font-bold text-white font-mono tracking-tight">
                        {formatTime()}
                    </div>

                    {/* Start/Pause Button */}
                    <div className="mt-8">
                        {status === 'idle' || status === 'paused' ? (
                            <button
                                onClick={start}
                                className="w-full md:w-auto px-12 py-4 md:px-16 md:py-5 text-xl md:text-2xl font-bold bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                            >
                                {status === 'paused' ? 'RESUME' : 'START'}
                            </button>
                        ) : (
                            <button
                                onClick={pause}
                                className="w-full md:w-auto px-12 py-4 md:px-16 md:py-5 text-xl md:text-2xl font-bold bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                            >
                                PAUSE
                            </button>
                        )}
                    </div>
                </div>

                {/* Session Counter */}
                <div className="text-white/90 text-base md:text-lg">
                    #{completedSessions + 1}
                </div>
                <div className="text-white/70 text-sm md:text-base">
                    Time to focus!
                </div>
            </div>
        </div>
    )
}

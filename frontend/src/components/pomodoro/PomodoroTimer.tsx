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

    const handleStartPause = () => {
        if (status === 'idle' || status === 'paused') {
            start()
        } else {
            pause()
        }
    }

    return (
        <div className="w-full max-w-[480px] mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
                {/* Mode Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => switchMode('work')}
                        className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium rounded transition-all ${mode === 'work'
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Pomodoro
                    </button>
                    <button
                        onClick={() => switchMode('shortBreak')}
                        className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium rounded transition-all ${mode === 'shortBreak'
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => switchMode('longBreak')}
                        className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium rounded transition-all ${mode === 'longBreak'
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Long Break
                    </button>
                </div>

                {/* Timer Display */}
                <div className="text-center mb-8">
                    <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-white font-mono">
                        {formatTime()}
                    </div>
                </div>

                {/* Start/Pause Button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={handleStartPause}
                        className="w-full md:w-auto px-16 py-4 bg-white text-[#d95550] text-xl font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                    >
                        {status === 'running' ? 'PAUSE' : 'START'}
                    </button>
                </div>
            </div>

            {/* Session Info */}
            <div className="text-center mt-6 text-white/90">
                <div className="text-lg font-medium">#{completedSessions + 1}</div>
                <div className="text-sm mt-1">Time to focus!</div>
            </div>
        </div>
    )
}

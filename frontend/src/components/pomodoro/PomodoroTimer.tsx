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
            <div className="bg-[#c15c58]/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl">
                {/* Mode Tabs */}
                <div className="flex justify-center gap-3 mb-10">
                    <button
                        onClick={() => switchMode('work')}
                        className={`px-4 py-2.5 text-base font-semibold rounded-md transition-all ${mode === 'work'
                                ? 'bg-[#a94843] text-white shadow-md'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        Pomodoro
                    </button>
                    <button
                        onClick={() => switchMode('shortBreak')}
                        className={`px-4 py-2.5 text-base font-semibold rounded-md transition-all ${mode === 'shortBreak'
                                ? 'bg-[#a94843] text-white shadow-md'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => switchMode('longBreak')}
                        className={`px-4 py-2.5 text-base font-semibold rounded-md transition-all ${mode === 'longBreak'
                                ? 'bg-[#a94843] text-white shadow-md'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        Long Break
                    </button>
                </div>

                {/* Timer Display */}
                <div className="text-center mb-10">
                    <div className="text-8xl md:text-9xl font-bold text-white font-mono tracking-tighter leading-none">
                        {formatTime()}
                    </div>
                </div>

                {/* Start/Pause Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleStartPause}
                        className="w-full md:w-auto px-20 py-5 bg-white text-[#d95550] text-2xl font-bold rounded-lg hover:bg-gray-50 active:scale-95 transition-all shadow-2xl"
                    >
                        {status === 'running' ? 'PAUSE' : 'START'}
                    </button>
                </div>
            </div>

            {/* Session Info */}
            <div className="text-center mt-8 text-white">
                <div className="text-xl font-semibold">#{completedSessions + 1}</div>
                <div className="text-base mt-1 opacity-90">Time to focus!</div>
            </div>
        </div>
    )
}

import { useState } from 'react'

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak'

export default function PomodoroTimer() {
    const [mode, setMode] = useState<TimerMode>('pomodoro')
    const [isRunning, setIsRunning] = useState(false)

    return (
        <div className="w-full max-w-[480px] mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
                {/* Mode Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setMode('pomodoro')}
                        className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium rounded transition-all ${mode === 'pomodoro'
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Pomodoro
                    </button>
                    <button
                        onClick={() => setMode('shortBreak')}
                        className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base font-medium rounded transition-all ${mode === 'shortBreak'
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white'
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => setMode('longBreak')}
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
                        22:23
                    </div>
                </div>

                {/* Start Button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="w-full md:w-auto px-16 py-4 bg-white text-[#d95550] text-xl font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                    >
                        {isRunning ? 'PAUSE' : 'START'}
                    </button>
                </div>
            </div>

            {/* Session Info */}
            <div className="text-center mt-6 text-white/90">
                <div className="text-lg font-medium">#1</div>
                <div className="text-sm mt-1">Time to focus!</div>
            </div>
        </div>
    )
}

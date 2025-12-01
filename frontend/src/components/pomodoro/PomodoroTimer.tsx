import { useEffect } from 'react'
import { usePomodoro } from '../../hooks/usePomodoro'
import Button from '../common/Button'
import Card from '../common/Card'

export default function PomodoroTimer() {
    const {
        mode,
        status,
        formatTime,
        progress,
        completedSessions,
        start,
        pause,
        reset,
        switchMode,
        skipToNext,
    } = usePomodoro()

    // Solicitar permiso para notificaciones
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }, [])

    const getModeLabel = () => {
        switch (mode) {
            case 'work':
                return 'Work Session'
            case 'shortBreak':
                return 'Short Break'
            case 'longBreak':
                return 'Long Break'
        }
    }

    const getModeColor = () => {
        switch (mode) {
            case 'work':
                return 'bg-blue-600'
            case 'shortBreak':
                return 'bg-green-600'
            case 'longBreak':
                return 'bg-purple-600'
        }
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <div className="text-center space-y-6">
                {/* Mode Indicator */}
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => switchMode('work')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'work'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Work
                    </button>
                    <button
                        onClick={() => switchMode('shortBreak')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'shortBreak'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Short Break
                    </button>
                    <button
                        onClick={() => switchMode('longBreak')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'longBreak'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Long Break
                    </button>
                </div>

                {/* Current Mode Label */}
                <h2 className="text-2xl font-bold text-gray-900">{getModeLabel()}</h2>

                {/* Timer Display */}
                <div className="relative">
                    <div className="text-8xl font-bold text-gray-900 font-mono">
                        {formatTime()}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ${getModeColor()}`}
                            style={{ width: `${progress()}%` }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-3">
                    {status === 'idle' || status === 'paused' ? (
                        <Button onClick={start} size="lg" className="min-w-[120px]">
                            {status === 'paused' ? 'Resume' : 'Start'}
                        </Button>
                    ) : (
                        <Button onClick={pause} variant="secondary" size="lg" className="min-w-[120px]">
                            Pause
                        </Button>
                    )}

                    <Button onClick={reset} variant="secondary" size="lg">
                        Reset
                    </Button>

                    <Button onClick={skipToNext} variant="secondary" size="lg">
                        Skip
                    </Button>
                </div>

                {/* Sessions Counter */}
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600">
                        Completed Sessions: <span className="font-bold text-gray-900">{completedSessions}</span>
                    </p>
                </div>

                {/* Instructions */}
                <div className="text-sm text-gray-500 space-y-1">
                    <p>🍅 Work for 25 minutes, then take a 5-minute break</p>
                    <p>After 4 sessions, enjoy a 15-minute long break</p>
                </div>
            </div>
        </Card>
    )
}

import { useState } from 'react'

export default function TasksSection() {
    const [showInput, setShowInput] = useState(false)

    return (
        <div className="w-full max-w-[480px] mx-auto px-4 mt-8">
            {/* Tasks Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-bold">Tasks</h2>
                <button className="text-white/70 hover:text-white text-xl">
                    ⋮
                </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/30 mb-4"></div>

            {/* Add Task Button */}
            {!showInput ? (
                <button
                    onClick={() => setShowInput(true)}
                    className="w-full py-4 border-2 border-dashed border-white/40 rounded-lg text-white/80 hover:border-white/60 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    <span className="text-xl">⊕</span>
                    <span className="font-medium">Add Task</span>
                </button>
            ) : (
                <div className="bg-white/10 rounded-lg p-4">
                    <input
                        type="text"
                        placeholder="What are you working on?"
                        className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 pb-2 mb-4 focus:outline-none focus:border-white/60"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition-colors">
                            Save
                        </button>
                        <button
                            onClick={() => setShowInput(false)}
                            className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

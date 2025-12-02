import { useState } from 'react'

export default function TasksSection() {
    const [showInput, setShowInput] = useState(false)

    return (
        <div className="w-full max-w-[480px] mx-auto px-4 mt-10">
            {/* Tasks Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-white text-base font-bold">Tasks</h2>
                <button className="text-white/70 hover:text-white text-2xl leading-none">
                    ⋮
                </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/20 mb-5"></div>

            {/* Add Task Button */}
            {!showInput ? (
                <button
                    onClick={() => setShowInput(true)}
                    className="w-full py-5 border-2 border-dashed border-white/30 hover:border-white/50 rounded-lg text-white/70 hover:text-white/90 transition-all flex items-center justify-center gap-2.5 group"
                >
                    <span className="text-2xl group-hover:scale-110 transition-transform">⊕</span>
                    <span className="font-medium text-base">Add Task</span>
                </button>
            ) : (
                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                    <input
                        type="text"
                        placeholder="What are you working on?"
                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-white/60 text-white placeholder-white/40 pb-3 mb-5 text-base focus:outline-none transition-colors"
                        autoFocus
                    />
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-md font-medium transition-colors">
                            Save
                        </button>
                        <button
                            onClick={() => setShowInput(false)}
                            className="px-5 py-2.5 text-white/70 hover:text-white transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

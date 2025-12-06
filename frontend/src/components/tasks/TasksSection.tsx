import { useState } from 'react'
import { usePomodoro } from '../../context/PomodoroContext'

export default function TasksSection() {
  const [showInput, setShowInput] = useState(false)
  const { mode } = usePomodoro()

  return (
    <div className="w-full mt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white text-base md:text-lg font-bold">Tasks</h2>
        {/* Botón menú - Blanco transparente con hover */}
        <button className="w-[34px] h-[32px] flex items-center justify-center text-white bg-white/20 hover:bg-white/30 rounded transition-colors">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>

      {/* Línea divisoria */}
      <div className="h-px bg-white/30 mb-3"></div>

      {/* Add Task Button - Color según modo activo con style inline */}
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          style={{
            backgroundColor: mode === 'work' ? '#c15c58' : mode === 'shortBreak' ? '#2c9a8f' : '#4a8cc7'
          }}
          className="w-full py-4 border-2 border-dashed border-white/40 hover:border-white rounded-lg text-white/70 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus-circle text-xl"></i>
          <span className="font-medium text-base md:text-lg">Add Task</span>
        </button>
      ) : (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <input
            type="text"
            placeholder="What are you working on?"
            className="w-full bg-transparent border-b-2 border-white/20 focus:border-white/60 text-white placeholder-white/40 pb-2 mb-4 text-base focus:outline-none"
            autoFocus
          />
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-white text-[#d95550] hover:bg-gray-50 rounded-md font-bold text-base">
              Save
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="px-5 py-2 text-white/70 hover:text-white font-medium text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import { usePomodoro } from '../../context/PomodoroContext'

export default function Header() {
  const { mode } = usePomodoro()

  return (
    <header className="h-[60px] flex items-center">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <i
              className={`fas fa-check text-sm ${
                mode === 'work'
                  ? 'text-[#d95550]'
                  : mode === 'shortBreak'
                    ? 'text-[#38b2ac]'
                    : 'text-[#5b9bd5]'
              }`}
            ></i>
          </div>
          <h1 className="text-white text-xl md:text-2xl font-bold">
            Pomofocus
          </h1>
        </div>

        {/* Buttons - Blanco transparente con hover */}
        <div className="flex items-center gap-[10px]">
          <button className="w-[34px] h-[34px] md:w-auto md:h-[32px] md:px-2.5 flex items-center justify-center md:gap-1.5 bg-white/20 hover:bg-white/30 rounded-md text-white text-sm md:text-base font-normal transition-colors">
            <i className="fas fa-chart-bar text-[18px] md:text-[16px]"></i>
            <span className="hidden md:inline">Report</span>
          </button>
          <button className="w-[34px] h-[34px] md:w-auto md:h-[32px] md:px-2.5 flex items-center justify-center md:gap-1.5 bg-white/20 hover:bg-white/30 rounded-md text-white text-sm md:text-base font-normal transition-colors">
            <i className="fas fa-cog text-[18px] md:text-[16px]"></i>
            <span className="hidden md:inline">Setting</span>
          </button>
          <button className="w-[34px] h-[34px] md:w-auto md:h-[32px] md:px-2.5 flex items-center justify-center md:gap-1.5 bg-white/20 hover:bg-white/30 rounded-md text-white text-sm md:text-base font-normal transition-colors">
            <i className="fas fa-user text-[18px] md:text-[16px]"></i>
            <span className="hidden md:inline">Sign In</span>
          </button>
          <button className="w-[34px] h-[34px] md:w-[32px] md:h-[32px] flex items-center justify-center bg-white/20 hover:bg-white/30 rounded text-white transition-colors">
            <i className="fas fa-ellipsis-v text-[18px] md:text-[16px]"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

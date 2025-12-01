export default function Header() {
    return (
        <header className="py-4 px-4 md:px-8">
            <div className="max-w-[640px] mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="text-red-500 text-sm">✓</span>
                        </div>
                        <h1 className="text-white text-xl font-bold">Pomofocus</h1>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Desktop buttons */}
                        <button className="hidden md:flex items-center gap-1 px-3 py-1.5 text-white/90 hover:text-white text-sm transition-colors">
                            <span>📊</span>
                            <span>Report</span>
                        </button>
                        <button className="hidden md:flex items-center gap-1 px-3 py-1.5 text-white/90 hover:text-white text-sm transition-colors">
                            <span>⚙️</span>
                            <span>Setting</span>
                        </button>
                        <button className="hidden md:flex items-center gap-1 px-3 py-1.5 text-white/90 hover:text-white text-sm transition-colors">
                            <span>👤</span>
                            <span>Sign In</span>
                        </button>

                        {/* Mobile icons only */}
                        <button className="md:hidden p-2 text-white/90 hover:text-white">
                            📊
                        </button>
                        <button className="md:hidden p-2 text-white/90 hover:text-white">
                            ⚙️
                        </button>
                        <button className="md:hidden p-2 text-white/90 hover:text-white">
                            👤
                        </button>

                        {/* Menu button (all screens) */}
                        <button className="p-2 text-white/90 hover:text-white">
                            ⋮
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

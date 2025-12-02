export default function Header() {
    return (
        <header className="py-5 px-4 md:px-8">
            <div className="max-w-[640px] mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <span className="text-red-500 text-sm font-bold">✓</span>
                        </div>
                        <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">Pomofocus</h1>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Desktop buttons */}
                        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm font-medium transition-all">
                            <span>📊</span>
                            <span>Report</span>
                        </button>
                        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm font-medium transition-all">
                            <span>⚙️</span>
                            <span>Setting</span>
                        </button>
                        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm font-medium transition-all">
                            <span>👤</span>
                            <span>Sign In</span>
                        </button>

                        {/* Mobile icons only */}
                        <button className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-all">
                            📊
                        </button>
                        <button className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-all">
                            ⚙️
                        </button>
                        <button className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-all">
                            👤
                        </button>

                        {/* Menu button (all screens) */}
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-all">
                            ⋮
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

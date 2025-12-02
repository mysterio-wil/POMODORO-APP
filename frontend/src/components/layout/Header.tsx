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

                    {/* Right Buttons - Desktop: texto + ícono, Móvil: solo íconos */}
                    <div className="flex items-center gap-2">
                        {/* Report Button */}
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm font-medium transition-all">
                            <span>📊</span>
                            <span className="hidden lg:inline">Report</span>
                        </button>

                        {/* Setting Button */}
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm font-medium transition-all">
                            <span>⚙️</span>
                            <span className="hidden lg:inline">Setting</span>
                        </button>

                        {/* Sign In Button */}
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white text-sm font-medium transition-all">
                            <span>👤</span>
                            <span className="hidden lg:inline">Sign In</span>
                        </button>

                        {/* Menu button */}
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-all">
                            ⋮
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

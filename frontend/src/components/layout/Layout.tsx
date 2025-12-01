import type { ReactNode } from 'react'
import Header from './Header'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600">
            <Header />
            <main className="w-full px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

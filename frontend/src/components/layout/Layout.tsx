import type { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d95550] to-[#c94843]">
            {children}
        </div>
    )
}

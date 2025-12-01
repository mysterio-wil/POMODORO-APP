import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    title?: string
    className?: string
}

export default function Card({ children, title, className = '' }: CardProps) {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            {children}
        </div>
    )
}

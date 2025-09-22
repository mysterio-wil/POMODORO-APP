// src/components/ErrorBoundary.tsx
import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded shadow text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Algo salió mal
            </h1>
            <p className="mb-4">Recarga la página o intenta más tarde.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Recargar
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

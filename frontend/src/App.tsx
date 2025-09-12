import { useEffect, useState } from 'react'
import { healthCheck } from './services/api'
import Dashboard from './components/Dashboard'

function App() {
  const [status, setStatus] = useState('')

  useEffect(() => {
    healthCheck().then((data) => setStatus(JSON.stringify(data)))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pomodoro App</h1>
      <p>Backend status: {status}</p>
      <hr className="my-4" />
      <Dashboard />
    </div>
  )
}

export default App

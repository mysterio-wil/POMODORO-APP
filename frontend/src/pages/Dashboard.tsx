import Layout from '../components/layout/Layout'
import Header from '../components/layout/Header'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'
import TasksSection from '../components/tasks/TasksSection'

export default function Dashboard() {
  // Progreso del pomodoro (placeholder)
  const progress = 0

  return (
    <Layout>
      {/* DIV ROJO 1 - Header */}
      <div className="w-full max-w-[640px] mx-auto px-2.5">
        {/* DIV AMARILLO 1 - Contenedor interno header (620px) */}
        <div className="w-full max-w-[620px] mx-auto">
          <Header />
        </div>
      </div>

      {/* DIV ROJO 2 - Body */}
      <div className="w-full max-w-[640px] mx-auto px-2.5">
        {/* DIV AMARILLO 2 - Contenedor interno body (620px) */}
        <div className="w-full max-w-[620px] mx-auto">
          {/* DIV VERDE 1 - Barra de progreso (620px) */}
          <div className="w-full h-[3px] bg-black/10 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-white/30 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* DIV VERDE 2 - Pomodoro (480px) */}
          <div className="w-full max-w-[480px] mx-auto">
            <PomodoroTimer />
          </div>

          {/* DIV VERDE 3 - Tasks (480px) */}
          <div className="w-full max-w-[480px] mx-auto">
            <TasksSection />
          </div>
        </div>
      </div>
    </Layout>
  )
}

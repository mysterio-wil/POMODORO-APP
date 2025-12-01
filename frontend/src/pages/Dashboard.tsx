import Layout from '../components/layout/Layout'
import Header from '../components/layout/Header'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'
import TasksSection from '../components/tasks/TasksSection'

export default function Dashboard() {
  return (
    <Layout>
      <Header />
      <main className="py-8">
        <PomodoroTimer />
        <TasksSection />
      </main>
    </Layout>
  )
}

import { useEffect, useState } from 'react'
import { getTasks, createTask } from '../services/tasks'

interface Task {
  id: number
  title: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error(err))
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    try {
      const newTask = await createTask(title)
      setTasks([...tasks, newTask])
      setTitle('')
    } catch (err) {
      console.error(err)
      alert('Error creando tarea')
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Mis Tareas</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mt-2">
        <input
          className="border p-2 flex-1"
          placeholder="Nueva tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded">Agregar</button>
      </form>
      <ul className="mt-4">
        {tasks.map((t) => (
          <li key={t.id} className="border p-2 rounded my-1">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

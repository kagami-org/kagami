import { FormEvent, useState } from "react"

type Task = {
  id: string,
  order: number,
  name: string,
  checked: boolean,
}

export const TodoBlock = () => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<string>('')

  function newTask(title: string): Task {
    return {
      id: `${Math.abs(Math.random() * 9999999999)}`,
      order: tasks.length,
      name: title,
      checked: false,
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (task.trim() === '') return;
    setTasks(prevTasks => [...prevTasks, newTask(task)]);
    setTask('')
  }

  function toggleCheckTask(theTask: Task) {
    const filter = tasks.filter(task => task.id !== theTask.id)
    const update = theTask;
    update.checked = !update.checked;
    const copy = [...filter, update];
    setTasks(copy)
  }

  return (
    <div>
      <h1> My list </h1>
      <form onSubmit={handleSubmit}>
        <input value={task} onChange={(e) => { setTask(e.target.value) }} type="text" placeholder="What's on your mind" />
      </form>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        {tasks.sort((a, b) => a.order - b.order).map(task => (<TaskComponent onClick={() => toggleCheckTask(task)} key={task.id} task={task} />))}
      </ul>
    </div>
  )
}

interface ITaskComponent {
  task: Task,
  onClick: Function,
}
function TaskComponent(props: ITaskComponent) {
  const { task, onClick } = props;
  const { checked } = task

  function click() { onClick() }

  return <li onClick={click} style={{ maxWidth: 100, margin: 0, padding: 0, cursor: 'pointer', listStyle: 'none', color: checked ? 'gray' : 'black' }} key={task.id}>{checked ? "☑️ " : "⬜ "}{task.name}</li>
}



import { FormEvent, useState } from "react";

type Task = {
  id: string;
  order: number;
  name: string;
  checked: boolean;
};

export const TodoBlock = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  function newTask(title: string): Task {
    return {
      id: `${Math.abs(Math.random() * 9999999999)}`,
      order: tasks.length,
      name: title,
      checked: false,
    };
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks((prevTasks) => [...prevTasks, newTask(task)]);
    setTask("");
  }

  function toggleCheckTask(theTask: Task) {
    const filter = tasks.filter((task) => task.id !== theTask.id);
    const update = theTask;
    update.checked = !update.checked;
    const copy = [...filter, update];
    setTasks(copy);
  }

  function removeTask(theTask: Task) {
    const filter = tasks.filter((task) => task.id !== theTask.id);
    setTasks(filter);
  }

  return (
    <div>
      <h1> My list </h1>
      <form onSubmit={handleSubmit}>
        <input
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          type="text"
          placeholder="What's on your mind"
        />
      </form>
      <div
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <TaskComponent
              onRemove={() => removeTask(task)}
              onClick={() => toggleCheckTask(task)}
              key={task.id}
              task={task}
            />
          ))}
      </div>
    </div>
  );
};

interface ITaskComponent {
  task: Task;
  onClick: Function;
  onRemove: Function;
}
function TaskComponent(props: ITaskComponent) {
  const { task, onClick, onRemove } = props;
  const { checked } = task;

  function click() {
    onClick();
  }
  function remove() {
    onRemove();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        gap: 10,
      }}
    >
      <div
        onClick={click}
        style={{
          minWidth: 125,
          margin: 0,
          padding: 0,
          cursor: "pointer",
          listStyle: "none",
          color: checked ? "gray" : "black",
        }}
        key={task.id}
      >
        {checked ? "☑️ " : "⬜ "}
        {task.name}
      </div>
      <button style={{ cursor: "pointer" }} onClick={remove}>
        {" 🗑️"}
      </button>
    </div>
  );
}

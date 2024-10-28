import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { Task } from "./todo-m";

const useTodoController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  function onChange(text: string) {
    setTask(text);
  }

  function newTask(title: string): Task {
    return {
      task: `${Math.abs(Math.random() * 9999999999)}`,
      order: tasks.length,
      name: title,
      checked: false,
    };
  }

  async function submit(title: string) {
    if (task.trim() === "") return;
    const _task = newTask(title);
    setTasks((prevTasks) => [...prevTasks, _task]);
    setTask("");
    await invoke("save_task", { task: _task });
  }

  function toggleCheckTask(theTask: Task) {
    const filter = tasks.filter((task) => task.task !== theTask.task);
    const update = theTask;
    update.checked = !update.checked;
    const copy = [...filter, update];
    setTasks(copy);
  }

  function removeTask(theTask: Task) {
    const filter = tasks.filter((task) => task.task !== theTask.task);
    setTasks(filter);
  }

  return {
    tasks,
    task,
    onChange,
    newTask,
    submit,
    toggleCheckTask,
    removeTask,
  };
};

export default useTodoController;

import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Task } from "./todo-m";

const useTodoController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  function onChange(text: string) {
    setTask(text);
  }

  function newTask(title: string): Task {
    return {
      task: `${Math.floor(Math.random() * 9999999999)}`,
      order: tasks.length,
      name: title,
      checked: false,
    };
  }

  async function getTasks() {
    setTasks(await invoke("list_tasks"));
  }

  async function submit(title: string) {
    if (task.trim() === "") return;
    const _task = newTask(title);
    setTasks((prevTasks) => [...prevTasks, _task]);
    setTask("");
    await invoke("save_task", { task: _task });
  }

  async function toggleCheckTask(theTask: Task) {
    const filter = tasks.filter((task) => task.task !== theTask.task);
    const update = theTask;
    update.checked = !update.checked;
    const copy = [...filter, update];
    setTasks(copy);
    // alert(JSON.stringify(theTask.id?.id.String))
    await invoke("update_check_state", { task: theTask.id?.id.String });
  }

  async function removeTask(theTask: Task) {
    const filter = tasks.filter((task) => task.task !== theTask.task);
    setTasks(filter);
    await invoke("remove_selected_task", { task: theTask.id?.id.String });
  }

  useEffect(() => {
    getTasks();
  }, []);

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

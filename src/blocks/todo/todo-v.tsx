import { FormEvent } from "react";
import { Form, List } from "semantic-ui-react";
import { TaskComponent } from "../../components/ui/task";
import useTodoController from "./todo-c";

export const TodoView = () => {
  const { tasks, task, onChange, submit, toggleCheckTask, removeTask } =
    useTodoController();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (task.trim() === "") return;
    submit(task);
  }

  function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div
      style={{
        minWidth: 100,
        maxWidth: 500,
        width: "100%",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <h1> My list </h1>
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Form.Input
          value={task}
          onChange={onChangeText}
          type="text"
          placeholder="What's on your mind"
        />
      </Form>
      <List divided verticalAlign="middle">
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <TaskComponent
              onRemove={() => removeTask(task)}
              onClick={() => toggleCheckTask(task)}
              key={task.task}
              task={task}
            />
          ))}
        {!tasks.length && (
          <div style={{ textAlign: "center" }}>
            <h3>No tasks yet!</h3>
          </div>
        )}
      </List>
    </div>
  );
};

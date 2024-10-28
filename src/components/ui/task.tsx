import { Button, Checkbox, ListContent, ListItem } from "semantic-ui-react";
import { Task } from "../../blocks/todo/todo-m";

interface ITaskComponent {
  task: Task;
  onClick: Function;
  onRemove: Function;
}

export function TaskComponent(props: ITaskComponent) {
  const { task, onClick, onRemove } = props;

  function click() {
    onClick();
  }
  function remove() {
    onRemove();
  }

  return (
    <ListItem>
      {task.checked && (
        <ListContent floated="right">
          <Button icon="trash" onClick={remove} size="mini"></Button>
        </ListContent>
      )}
      <div style={{ height: 6 }}></div>
      <Checkbox label={task.name} onChange={click} checked={task.checked} />
      <div style={{ height: 6 }}></div>
    </ListItem>
  );
}

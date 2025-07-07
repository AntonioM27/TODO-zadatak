import TaskItem from "../TaskItem/TaskItem";

function TaskList({ tasks, onToggle, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;

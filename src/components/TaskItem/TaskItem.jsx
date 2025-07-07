import { Link } from "react-router-dom";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDeleteTask }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.source)}
      />

      {task.source === "api" ? (
        <Link to={`/api-todo/${task.id}`} className="task-link">
          {task.title}
        </Link>
      ) : (
        <span>{task.title}</span>
      )}

      <span className="task-category">({task.category})</span>

      {task.source === "user" && (
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      )}
    </li>
  );
}

export default TaskItem;

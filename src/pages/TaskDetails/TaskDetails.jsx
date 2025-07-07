import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TaskDetails.css";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-details">
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Finished" : "Not finished"}
      </p>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default TaskDetails;

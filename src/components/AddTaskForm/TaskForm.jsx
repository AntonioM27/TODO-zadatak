import { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Job");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please write the task.");
      return;
    }

    onAddTask(title.trim(), category);
    setTitle("");
    setCategory("Job");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Job">Job</option>
        <option value="Private">Private</option>
        <option value="Family">Family</option>
      </select>

      <button type="submit">Add</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;

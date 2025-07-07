import { useEffect, useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import "./HomePage.css";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import TaskForm from "../../components/AddTaskForm/TaskForm";

function HomePage() {
  const [apiTasks, setApiTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data = await response.json();

      const tasksWithCategory = data.map((task) => ({
        ...task,
        category: "API",
        source: "api",
      }));

      setApiTasks(tasksWithCategory);
    };

    fetchTasks();
  }, []);

  const allTasks = [...apiTasks, ...userTasks];

  const toggleTaskCompleted = (id, source) => {
    if (source === "api") {
      const updatedTasks = apiTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setApiTasks(updatedTasks);
    } else {
      const updatedTasks = userTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setUserTasks(updatedTasks);
    }
  };

  const filteredTasks = allTasks.filter((task) => {
    if (categoryFilter === "All") return true;
    return task.source === categoryFilter;
  });

  const handleAddTask = (title, category) => {
    const newTask = {
      id: Date.now(),
      title,
      category,
      completed: false,
      source: "user",
    };
    setUserTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    const updatedUserTasks = userTasks.filter((task) => task.id !== id);
    setUserTasks(updatedUserTasks);
  };

  return (
    <div className="homepage-container">
      <h1>To-Do App</h1>
      <TaskForm onAddTask={handleAddTask} />
      <CategoryFilter
        selectedCategory={categoryFilter}
        onSelectCategory={setCategoryFilter}
      />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTaskCompleted}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default HomePage;

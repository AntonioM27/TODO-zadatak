import { useEffect, useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import "./HomePage.css";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import TaskForm from "../../components/AddTaskForm/TaskForm";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

function HomePage() {
  const [apiTasks, setApiTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [taskToDelete, setTaskToDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    if (selectedSource !== "All" && task.source !== selectedSource)
      return false;
    if (
      selectedSource !== "api" &&
      selectedCategory !== "All" &&
      task.category !== selectedCategory
    )
      return false;
    return true;
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

  const handleRequestDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updatedUserTasks = userTasks.filter(
      (task) => task.id !== taskToDelete
    );
    setUserTasks(updatedUserTasks);
    setShowModal(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  return (
    <div className="homepage-container">
      <h1>To-Do App</h1>
      <TaskForm onAddTask={handleAddTask} />

      <CategoryFilter
        selectedSource={selectedSource}
        onSelectSource={setSelectedSource}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTaskCompleted}
        onDeleteTask={handleRequestDelete}
      />

      <ConfirmationModal
        isOpen={showModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default HomePage;

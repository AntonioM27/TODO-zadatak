import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TaskDetails from "./pages/TaskDetails/TaskDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/api-todo/:id" element={<TaskDetails />} />
    </Routes>
  );
}

export default App;
